import { useMemo, useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Button,
  Alert,
  CircularProgress,
  useTheme
} from '@mui/material'
import MapboxMap from './MapboxMap'
import QuoteForm from './QuoteForm'
import { getIrradiance, computeSystemFromConsumption } from '../services/api'

export default function Calculator() {
	const [mode, setMode] = useState('monthly') // 'monthly' | 'annual'
	const [consumption, setConsumption] = useState('')
	const [coords, setCoords] = useState({ lat: null, lon: null })
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [result, setResult] = useState(null)
	const [quoteOpen, setQuoteOpen] = useState(false)
	const [step, setStep] = useState(0) // 0: usage, 1: location, 2: review
	const theme = useTheme()

	const steps = ['Usage', 'Location', 'Review']

	const annualKWh = useMemo(() => {
		const val = Number(consumption) || 0
		return mode === 'monthly' ? val * 12 : val
	}, [mode, consumption])

	async function handleCalculate() {
		setError('')
		setResult(null)
		if (!coords.lat || !coords.lon) {
			setError('Please select a location on the map')
			setStep(1)
			return
		}
		if (annualKWh <= 0) {
			setError('Enter a valid consumption value')
			setStep(0)
			return
		}
		setLoading(true)
		try {
			const ir = await getIrradiance(coords.lat, coords.lon)
			const computed = computeSystemFromConsumption({
				consumptionKWhPerYear: annualKWh,
				acAnnualKWhPerKW: ir.acAnnualKWhPerKW,
			})
			setResult({ ...computed, irradiance: ir })
		} catch (e) {
			setError(e.message || 'Failed to fetch irradiance')
		} finally {
			setLoading(false)
		}
	}

	function handleQuoteSubmit(data) {
		console.log('Quote form data:', { ...data, coords, result })
		setQuoteOpen(false)
	}

	return (
		<Box component="section" sx={{ bgcolor: 'background.default', py: 6 }}>
			<Container maxWidth="lg">
				<Typography
					variant="h2"
					component="h1"
					sx={{ mb: 4, textAlign: 'center', color: 'primary.main' }}
				>
					Solar Calculator
				</Typography>

				{/* Progress Stepper */}
				<Stepper
					activeStep={step}
					sx={{
						mb: 6,
						'& .MuiStepLabel-label': {
							fontSize: { xs: '0.875rem', sm: '1rem' }
						}
					}}
				>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>

				<Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
					{/* Form Section */}
					<Box>
						<Card elevation={2}>
							<CardContent sx={{ p: 4 }}>
								{step === 0 && (
									<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
										<Typography variant="h6" component="h3">
											Your electricity usage
										</Typography>
										<Box sx={{ display: 'flex', gap: 2 }}>
                                <FormControl sx={{ minWidth: 160 }}>
												<InputLabel>Period</InputLabel>
												<Select
													value={mode}
													label="Period"
													onChange={(e) => setMode(e.target.value)}
												>
													<MenuItem value="monthly">Monthly kWh</MenuItem>
													<MenuItem value="annual">Annual kWh</MenuItem>
												</Select>
											</FormControl>
											<TextField
												label="Enter kWh"
												value={consumption}
												onChange={(e) => setConsumption(e.target.value)}
												type="number"
												fullWidth
                                    inputProps={{ min: 0, step: 1 }}
                                    InputProps={{
                                      endAdornment: <InputAdornment position="end">kWh</InputAdornment>
                                    }}
                                    placeholder={mode === 'monthly' ? 'e.g., 900' : 'e.g., 10800'}
                                    helperText={
                                      mode === 'monthly'
                                        ? 'Tip: Enter your average monthly consumption.'
                                        : 'Tip: Sum of the last 12 months from your bill.'
                                    }
											/>
										</Box>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                              {['Estimate is approximate', 'You can adjust later', 'No data is shared'].map((t) => (
                                <Button key={t} size="small" variant="outlined" disabled sx={{ pointerEvents: 'none' }}>
                                  {t}
                                </Button>
                              ))}
                            </Box>
										<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
											<Button disabled>Back</Button>
											<Button 
												variant="contained" 
												onClick={() => setStep(1)}
												disabled={!consumption}
											>
												Next
											</Button>
										</Box>
									</Box>
								)}

								{step === 1 && (
									<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
										<Typography variant="h6" component="h3">
											Your location
										</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Click the map to drop a marker at your home. You can drag it to adjust.
                                    </Typography>
										<Box sx={{ height: 300 }}>
											<MapboxMap lat={coords.lat} lon={coords.lon} onChange={setCoords} height={300} />
										</Box>
										<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
											<Button onClick={() => setStep(0)}>Back</Button>
											<Button 
												variant="contained" 
												onClick={() => setStep(2)}
												disabled={!coords.lat || !coords.lon}
											>
												Next
											</Button>
										</Box>
									</Box>
								)}

								{step === 2 && (
									<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
										<Typography variant="h6" component="h3">
											Review & Calculate
										</Typography>
										<Box component="ul" sx={{ pl: 2, '& li': { mb: 1 } }}>
											<li>
												<Typography variant="body2">
													Usage: <strong>{annualKWh.toLocaleString()} kWh/year</strong>
												</Typography>
											</li>
											<li>
												<Typography variant="body2">
													Location: <strong>{coords.lat && coords.lon ? `${coords.lat.toFixed(3)}, ${coords.lon.toFixed(3)}` : 'Not selected'}</strong>
												</Typography>
											</li>
										</Box>
										{error && (
											<Alert severity="error" sx={{ mb: 2 }}>
												{error}
											</Alert>
										)}
										<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
											<Button onClick={() => setStep(1)}>Back</Button>
											<Button 
												variant="contained" 
												onClick={handleCalculate} 
												disabled={loading}
												startIcon={loading && <CircularProgress size={20} />}
											>
												{loading ? 'Calculating...' : 'Calculate System'}
											</Button>
										</Box>
									</Box>
								)}
							</CardContent>
						</Card>
					</Box>

					{/* Results Section */}
					<Box>
						<Card elevation={2} sx={{ position: { md: 'sticky' }, top: 24 }}>
							<CardContent sx={{ p: 4 }}>
								{result ? (
									<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                                    Your Solar System
                                </Typography>
										<Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2 }}>
											<Box>
                                                <Card variant="outlined" sx={{ height: '100%' }}>
													<CardContent sx={{ textAlign: 'center', py: 2 }}>
														<Typography variant="caption" color="text.secondary">
															System Size
														</Typography>
														<Typography variant="h4" color="primary.main" fontWeight={600}>
															{result.systemKW.toFixed(2)} kW
														</Typography>
													</CardContent>
												</Card>
											</Box>
											<Box>
                                                <Card variant="outlined" sx={{ height: '100%' }}>
													<CardContent sx={{ textAlign: 'center', py: 2 }}>
														<Typography variant="caption" color="text.secondary">
															Panels
														</Typography>
														<Typography variant="h4" color="primary.main" fontWeight={600}>
															{result.panels}
														</Typography>
													</CardContent>
												</Card>
											</Box>
											<Box>
                                                <Card variant="outlined" sx={{ height: '100%' }}>
													<CardContent sx={{ textAlign: 'center', py: 2 }}>
														<Typography variant="caption" color="text.secondary">
															Yearly Savings
														</Typography>
														<Typography variant="h4" color="primary.main" fontWeight={600}>
															${result.savingsPerYear.toFixed(0)}
														</Typography>
													</CardContent>
												</Card>
											</Box>
										</Box>
										<Button 
											variant="contained" 
											size="large"
											onClick={() => setQuoteOpen(true)}
											sx={{ mt: 2 }}
										>
											Request a Quote
										</Button>
										<QuoteForm open={quoteOpen} onClose={() => setQuoteOpen(false)} onSubmit={handleQuoteSubmit} />
									</Box>
								) : (
									<Box sx={{ textAlign: 'center', py: 8 }}>
										<Typography variant="body1" color="text.secondary">
											Complete the form to see your solar estimate
										</Typography>
									</Box>
								)}
							</CardContent>
						</Card>
					</Box>
				</Box>
			</Container>
		</Box>
	)
}
