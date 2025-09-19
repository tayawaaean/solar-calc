import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button
} from '@mui/material'
import { CheckCircle, TrendingUp, Security, Speed } from '@mui/icons-material'

export default function About() {
	const benefits = [
		{
			icon: TrendingUp,
			title: 'Real savings',
			description: 'Estimates based on your usage and location.'
		},
		{
			icon: Security,
			title: 'Trusted network',
			description: 'Quality equipment and warranties.'
		},
		{
			icon: Speed,
			title: 'Fast & simple',
			description: 'From estimate to quotes in minutes.'
		}
	]

	const steps = [
		'Enter your electricity usage',
		'Select your home on the map',
		'Review system size, panels, and savings',
		'Request quotes from vetted installers'
	]

	return (
		<Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
			{/* Top trust chips */}
			<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
				<Box component="span" sx={{ fontSize: '0.75rem', px: 1.5, py: 0.5, border: 1, borderColor: 'divider', borderRadius: 1 }}>Powered by PVWatts (NREL)</Box>
				<Box component="span" sx={{ fontSize: '0.75rem', px: 1.5, py: 0.5, border: 1, borderColor: 'divider', borderRadius: 1 }}>30% Federal ITC</Box>
				<Box component="span" sx={{ fontSize: '0.75rem', px: 1.5, py: 0.5, border: 1, borderColor: 'divider', borderRadius: 1 }}>Vetted installers</Box>
			</Box>
			<Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 6, md: 8 }, alignItems: 'center' }}>
				<Box>
					<Typography variant="h2" component="h1" sx={{ mb: 3 }}>
						Why choose SolarCalc
					</Typography>
					<Typography variant="h6" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
						Lower bills, higher value, smaller footprint.
					</Typography>
					<Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
						We size your system using real irradiance data and your usage—then match you with trusted installers. No sales pressure, just clarity.
					</Typography>
					
					<Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 3 }}>
						{benefits.map((benefit, index) => (
							<Box key={index}>
								<Card 
									variant="outlined" 
									sx={{ 
										height: '100%',
										'&:hover': {
											boxShadow: 2,
											transform: 'translateY(-2px)',
										},
										transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
									}}
								>
									<CardContent sx={{ p: 3 }}>
										<Box sx={{ 
											display: 'flex', 
											alignItems: 'center', 
											mb: 2,
											color: 'primary.main'
										}}>
											<benefit.icon sx={{ fontSize: 28, mr: 1 }} />
											<Typography variant="h6" component="h3">
												{benefit.title}
											</Typography>
										</Box>
										<Typography variant="body2" color="text.secondary">
											{benefit.description}
										</Typography>
									</CardContent>
								</Card>
							</Box>
						))}
					</Box>
				</Box>
				
				<Box>
					<Card 
						sx={{ 
							bgcolor: 'grey.50',
							border: 1,
							borderColor: 'divider'
						}}
					>
						<CardContent sx={{ p: 4 }}>
							<Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
								How it works
							</Typography>
							<Box sx={{ 
								width: '100%', 
								aspectRatio: '16/9', 
								borderRadius: 2, 
								mb: 2, 
								bgcolor: 'background.paper', 
								border: 1, 
								borderColor: 'divider',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: 'text.disabled'
							}}>
								Illustration placeholder
							</Box>
							<List sx={{ p: 0 }}>
								{steps.map((step, index) => (
									<ListItem key={index} sx={{ px: 0, py: 1 }}>
										<ListItemIcon sx={{ minWidth: 36 }}>
											<Box sx={{
												width: 24,
												height: 24,
												borderRadius: '50%',
												bgcolor: 'primary.main',
												color: 'primary.contrastText',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												fontSize: '0.875rem',
												fontWeight: 600
											}}>
												{index + 1}
											</Box>
										</ListItemIcon>
										<ListItemText 
											primary={step}
											primaryTypographyProps={{
												variant: 'body1',
												color: 'text.primary'
											}}
										/>
									</ListItem>
								))}
							</List>
						</CardContent>
					</Card>
				</Box>
			</Box>
			
			{/* Bottom CTA */}
			<Box sx={{ mt: 8, textAlign: 'center' }}>
				<Typography variant="h6" sx={{ mb: 1 }}>
					Ready to explore your solar potential?
				</Typography>
				<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
					Takes about 3 minutes. No commitments.
				</Typography>
				<Button variant="contained" href="/calculator">Start your estimate</Button>
			</Box>
		</Container>
	)
}
