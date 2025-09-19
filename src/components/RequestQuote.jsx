import { Box, Container, Typography, Button } from '@mui/material'
import { useState } from 'react'
import QuoteForm from './QuoteForm'

export default function RequestQuote({ onOpen }) {
	const [quoteOpen, setQuoteOpen] = useState(false)

	function handleQuoteSubmit(data) {
		console.log('Quote form data:', data)
		setQuoteOpen(false)
	}

	return (
		<Box component="section" sx={{ bgcolor: 'grey.50', py: { xs: 10, md: 15 } }}>
			<Container maxWidth="md">
				<Box sx={{ textAlign: 'center' }}>
					<Typography variant="h2" component="h1" sx={{ mb: 2, color: 'primary.main' }}>
						Ready to see your offers?
					</Typography>
					<Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
						Get custom quotes from trusted local installers based on your needs.
					</Typography>
					<Button 
						variant="contained" 
						size="large"
						onClick={() => setQuoteOpen(true)}
						sx={{ 
							py: 1.5, 
							px: 4, 
							fontSize: '1.1rem',
							mb: 4
						}}
					>
						Request a quote
					</Button>
					
					{/* Trust Signals */}
					<Box sx={{ 
						display: 'flex', 
						justifyContent: 'center', 
						alignItems: 'center', 
						gap: { xs: 2, sm: 4 },
						flexWrap: 'wrap'
					}}>
						{['Secure & private', 'No spam', 'Trusted installers'].map((text) => (
							<Box key={text} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
								<Box sx={{ 
									width: 20, 
									height: 20, 
									display: 'flex', 
									alignItems: 'center', 
									justifyContent: 'center', 
									border: 1, 
									borderColor: 'divider',
									borderRadius: 1,
									fontSize: '0.75rem',
									color: 'success.main'
								}}>
									✓
								</Box>
								<Typography variant="caption" color="text.secondary">
									{text}
								</Typography>
							</Box>
						))}
					</Box>
				</Box>
			</Container>
			<QuoteForm open={quoteOpen} onClose={() => setQuoteOpen(false)} onSubmit={handleQuoteSubmit} />
		</Box>
	)
}
