import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography, 
  Container,
  Box,
  TextField,
  InputAdornment
} from '@mui/material'
import { ExpandMore, Search } from '@mui/icons-material'
import { useState } from 'react'

export default function FAQ() {
	const [searchTerm, setSearchTerm] = useState('')
	const [expanded, setExpanded] = useState(false)

	const faqs = [
		{
			id: 'accuracy',
			question: 'How accurate are the savings estimates?',
			answer: 'We use NREL PVWatts irradiance data and your usage inputs to provide realistic estimates. Actual savings vary by equipment, shading, and local utility rates. Our estimates are typically within 10-15% of actual results.'
		},
		{
			id: 'batteries',
			question: 'Do I need batteries?',
			answer: 'Batteries are optional for most homeowners. Grid-tied systems without batteries can significantly reduce your electricity bills. Batteries add backup power during outages but increase system cost and complexity.'
		},
		{
			id: 'incentives',
			question: 'What incentives are available?',
			answer: 'Federal tax credits, state rebates, and local incentives vary by location. The federal solar tax credit is currently 30% through 2032. Your installer will help identify all applicable incentives for your specific situation.'
		},
		{
			id: 'installation',
			question: 'How long does installation take?',
			answer: 'Most residential solar installations take 1-3 days to complete. However, the entire process from contract signing to system activation typically takes 6-12 weeks due to permitting, utility approvals, and scheduling.'
		},
		{
			id: 'maintenance',
			question: 'What maintenance is required?',
			answer: 'Solar panels require minimal maintenance. Occasional cleaning and annual inspections are recommended. Most systems come with 20-25 year warranties and monitoring systems to track performance.'
		},
		{
			id: 'roof-requirements',
			question: 'What roof conditions are needed?',
			answer: 'Ideal roofs face south with minimal shading and are in good structural condition. However, east and west-facing roofs can also work well. We assess roof suitability during the quote process.'
		}
	]

	const filteredFaqs = faqs.filter(faq =>
		faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
		faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
			<Typography variant="h2" component="h1" textAlign="center" sx={{ mb: 2 }}>
				Frequently Asked Questions
			</Typography>
			<Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
				Find answers to common questions about solar energy and our calculator.
			</Typography>

			<TextField
				fullWidth
				placeholder="Search FAQs..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Search />
						</InputAdornment>
					),
				}}
				sx={{ mb: 4 }}
			/>

			{filteredFaqs.length > 0 ? (
				<Box>
					{filteredFaqs.map((faq) => (
						<Accordion
							key={faq.id}
							expanded={expanded === faq.id}
							onChange={(event, isExpanded) => setExpanded(isExpanded ? faq.id : false)}
							sx={{
								mb: 1,
								'&:before': { display: 'none' },
								borderRadius: '8px !important',
								border: 1,
								borderColor: 'divider',
								'&:hover': {
									boxShadow: 2,
								},
								transition: 'box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
							}}
						>
							<AccordionSummary
								expandIcon={<ExpandMore />}
								aria-controls={`${faq.id}-content`}
								id={`${faq.id}-header`}
								sx={{ 
									'& .MuiAccordionSummary-content': {
										my: 2
									}
								}}
							>
								<Typography variant="h6" component="h3">
									{faq.question}
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
									{faq.answer}
								</Typography>
							</AccordionDetails>
						</Accordion>
					))}
				</Box>
			) : (
				<Box textAlign="center" sx={{ py: 8 }}>
					<Typography variant="h6" sx={{ mb: 1 }}>
						No FAQs found
					</Typography>
					<Typography color="text.secondary">
						Try different keywords or browse all questions above.
					</Typography>
				</Box>
			)}
		</Container>
	)
}
