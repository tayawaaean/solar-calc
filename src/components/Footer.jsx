import { Box, Container, Typography, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function Footer() {
	return (
		<Box
			component="footer"
			sx={{
				borderTop: 1,
				borderColor: 'divider',
				bgcolor: 'background.paper',
				mt: { xs: 8, md: 16 }
			}}
		>
			<Container maxWidth="lg">
				<Box sx={{ py: { xs: 4, md: 6 } }}>
					<Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
						<Box>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
								<Box sx={{
									width: 28,
									height: 28,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									borderRadius: 1,
									bgcolor: 'primary.main',
									color: 'primary.contrastText',
									fontWeight: 'bold',
									fontSize: '0.875rem'
								}}>
									SC
								</Box>
								<Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
									SolarCalc
								</Typography>
							</Box>
							<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
								© {new Date().getFullYear()} SolarCalc. All rights reserved.
							</Typography>
							<Typography variant="body2" color="text.disabled">
								Designed for clarity and trust
							</Typography>
						</Box>
						
						<Box>
							<Box sx={{ 
								display: 'flex', 
								flexDirection: { xs: 'column', sm: 'row' },
								gap: { xs: 2, sm: 4 },
								justifyContent: { sm: 'flex-end' }
							}}>
								<Box>
									<Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
										Tools
									</Typography>
									<Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
										<Link component={RouterLink} to="/calculator" color="text.secondary" underline="hover">
											Solar Calculator
										</Link>
										<Link component={RouterLink} to="/request-quote" color="text.secondary" underline="hover">
											Get Quote
										</Link>
									</Box>
								</Box>
								
								<Box>
									<Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
										Learn
									</Typography>
									<Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
										<Link component={RouterLink} to="/about" color="text.secondary" underline="hover">
											About Solar
										</Link>
										<Link component={RouterLink} to="/faq" color="text.secondary" underline="hover">
											FAQ
										</Link>
									</Box>
								</Box>
							</Box>
							</Box>
						</Box>
				</Box>
			</Container>
		</Box>
	)
}
