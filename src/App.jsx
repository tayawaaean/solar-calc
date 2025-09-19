import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  alpha
} from '@mui/material'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import { Menu as MenuIcon, Close as CloseIcon, SolarPower, Savings, Shield, TaskAlt, ChevronRight } from '@mui/icons-material'
import Hero from './components/Hero'
import Calculator from './components/Calculator'
import About from './components/About'
import FAQ from './components/FAQ'
import RequestQuote from './components/RequestQuote'
import Footer from './components/Footer'

function HomePage() {
	const theme = useTheme();
	
	return (
		<>
			<Hero />
			
				{/* Trust badges strip */}
			<Box sx={{ borderTop: 1, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
				<Container maxWidth="lg">
					<Box sx={{ 
						py: 3, 
						display: 'flex', 
						flexWrap: 'wrap', 
						alignItems: 'center', 
						justifyContent: 'center', 
						gap: 3 
					}}>
						{['Secure & private', 'No spam', 'Vetted installers'].map((text) => (
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
				</Container>
			</Box>

				{/* Benefits grid */}
			<Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
				<Typography variant="h2" component="h2" textAlign="center" sx={{ mb: 2 }}>
					Why choose SolarCalc
				</Typography>
				<Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
					Fast, accurate estimates and trusted local installers.
				</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
                    {[
                        { title: 'Get accurate sizing', desc: 'Tailored to your usage and location.', icon: <SolarPower fontSize="small" /> },
                        { title: 'See real savings', desc: 'Transparent cost and payback estimate.', icon: <Savings fontSize="small" /> },
                        { title: 'Compare vetted installers', desc: 'Only trusted local pros.', icon: <Shield fontSize="small" /> },
                        { title: 'Request quotes when ready', desc: 'No sales pressure—ever.', icon: <TaskAlt fontSize="small" /> },
                    ].map((benefit) => (
                        <Box key={benefit.title} sx={{ 
                            p: 3, 
                            border: 1, 
                            borderColor: 'divider', 
                            borderRadius: 2, 
                            bgcolor: 'background.paper',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: 2,
                            },
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Box aria-hidden sx={{ color: 'primary.main', display: 'inline-flex' }}>{benefit.icon}</Box>
                                <Typography variant="h6" component="h3">
                                    {benefit.title}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {benefit.desc}
                            </Typography>
                            <Button size="small" variant="text" component={Link} to="/about" aria-label={`Learn more about ${benefit.title}`} sx={{ p: 0, minWidth: 'auto', gap: 0.5 }} endIcon={<ChevronRight fontSize="small" />}>
                                Learn more
                            </Button>
                        </Box>
                    ))}
                </Box>
			</Container>

				{/* How it works timeline */}
			<Box sx={{ bgcolor: 'grey.50', py: { xs: 8, md: 12 } }}>
				<Container maxWidth="lg">
					<Typography variant="h2" component="h2" textAlign="center" sx={{ mb: 6 }}>
						How it works
					</Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                        {[ 
                            { n: 1, title: 'Enter usage', desc: 'Use your bill or a monthly average.' },
                            { n: 2, title: 'Select location', desc: 'Pin your home on the map.' },
                            { n: 3, title: 'Review results', desc: 'See system size and savings.' },
                        ].map((step) => (
                            <Box key={step.n} sx={{ 
                                p: 3, 
                                border: 1, 
                                borderColor: 'divider', 
                                borderRadius: 2, 
                                bgcolor: 'background.paper',
                                '&:hover': { boxShadow: 2 }
                            }}>
                                <Box sx={{ 
                                    width: 36, 
                                    height: 36, 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    borderRadius: '50%', 
                                    bgcolor: 'primary.main', 
                                    color: 'primary.contrastText',
                                    fontWeight: 700,
                                    mb: 2
                                }}>
                                    {step.n}
                                </Box>
                                <Typography variant="h6" component="h3" sx={{ mb: 0.5 }}>
                                    {step.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {step.desc}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
				</Container>
			</Box>

				{/* Testimonials */}
            <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 }, '@media (prefers-reduced-motion: no-preference)': { '& .fade-in': { opacity: 0, transform: 'translateY(8px)', animation: 'fadeIn 500ms ease-out forwards', animationDelay: '100ms' }, '@keyframes fadeIn': { to: { opacity: 1, transform: 'none' } } } }}>
                <Typography className="fade-in" variant="h2" component="h2" textAlign="center" sx={{ mb: 6 }}>
                    What customers say
                </Typography>
                <Box className="fade-in" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
							{[
                        { q: 'Saved me hours and gave me confidence.', n: 'Alicia R., Austin', r: 5 },
                        { q: 'Estimate matched what the installer quoted.', n: 'Sam K., Denver', r: 5 },
                        { q: 'Clear, simple, and no sales pressure.', n: 'Priya M., Phoenix', r: 5 },
							].map((t) => (
                        <Box key={t.n} sx={{ p: 0 }}>
                            <Box sx={{ p: 3, border: 1, borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper', height: '100%' }}>
                                <Typography aria-hidden role="img" sx={{ fontSize: 28, lineHeight: 1, mb: 1 }}>“</Typography>
                                <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }} aria-label={`${t.r} out of 5 stars`}>
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Box key={i} aria-hidden sx={{ color: i < (t.r || 0) ? 'warning.main' : 'divider' }}>★</Box>
                                    ))}
                                </Box>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    {t.q}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {t.n}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Container>

				{/* Primary cards */}
            <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 }, '@media (prefers-reduced-motion: no-preference)': { '& .fade-in': { opacity: 0, transform: 'translateY(8px)', animation: 'fadeIn 500ms ease-out forwards', animationDelay: '150ms' } } }}>
                <Box className="fade-in" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 4 }}>
                    <Box sx={{ 
                        p: 3, 
                        border: 1, 
                        borderColor: 'divider', 
                        borderRadius: 2, 
                        bgcolor: 'background.paper'
                    }}>
                        <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
                            Estimate your savings
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                            Use our calculator to size your system and see potential savings.
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Uses real irradiance data
                        </Typography>
                        <Button 
                            variant="contained" 
                            component={Link} 
                            to="/calculator"
                            sx={{ mt: 2 }}
                        >
                            Open Calculator
                        </Button>
                    </Box>
                    <Box sx={{ 
                        p: 3, 
                        border: 1, 
                        borderColor: 'divider', 
                        borderRadius: 2, 
                        bgcolor: 'background.paper'
                    }}>
                        <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
                            Learn about going solar
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                            Understand benefits, incentives, and what to expect.
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            30% federal tax credit (ITC)
                        </Typography>
                        <Button 
                            variant="outlined" 
                            component={Link} 
                            to="/about"
                            sx={{ mt: 2 }}
                        >
                            About Solar
                        </Button>
                    </Box>
                </Box>
            </Container>
		</>
	)
}

function App() {
	const [mobileOpen, setMobileOpen] = useState(false)
	const theme = useTheme()
  const location = useLocation()
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 8 })

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen)
	}

	const menuItems = [
		{ label: 'Home', path: '/' },
		{ label: 'Calculator', path: '/calculator' },
		{ label: 'About', path: '/about' },
		{ label: 'FAQ', path: '/faq' },
	]

	return (
		<Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
			{/* Skip link for accessibility */}
			<Box component="a" href="#main-content" sx={{
				position: 'absolute',
				top: -40,
				left: 0,
				px: 2,
				py: 1,
				bgcolor: 'primary.main',
				color: 'primary.contrastText',
				borderRadius: 1,
				'&:focus': { top: 8 }
			}}>
				Skip to content
			</Box>
			<AppBar position="sticky" elevation={trigger ? 4 : 0} sx={{
				backgroundColor: trigger ? theme.palette.background.paper : alpha(theme.palette.background.paper, 0.8),
				backdropFilter: 'blur(8px)',
				borderBottom: 1,
				borderColor: 'divider'
			}}>
				<Container maxWidth="lg">
					<Toolbar sx={{ px: { xs: 0 }, height: 64 }}>
						<Button
							component={Link}
							to="/"
							onClick={() => setMobileOpen(false)}
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 1,
								textTransform: 'none',
								color: 'primary.main',
								'&:hover': { bgcolor: 'transparent', opacity: 0.9 }
							}}
						>
							<Box sx={{
								width: 36,
								height: 36,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								borderRadius: 1,
								bgcolor: 'primary.main',
								color: 'primary.contrastText',
								fontWeight: 'bold'
							}}>
								SC
							</Box>
							<Typography variant="h6" component="span" sx={{ 
								fontWeight: 600, 
								letterSpacing: '-0.025em',
								display: { xs: 'none', sm: 'block' }
							}}>
								SolarCalc
							</Typography>
						</Button>

						<Box sx={{ flexGrow: 1 }} />

						{/* Desktop Navigation */}
						<Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
						{menuItems.map((item) => (
								<Button
									key={item.path}
									component={Link}
									to={item.path}
								aria-current={location.pathname === item.path ? 'page' : undefined}
								sx={{
									color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
									fontWeight: location.pathname === item.path ? 600 : 400,
									'&:hover': {
										color: 'primary.main',
										bgcolor: 'transparent'
									}
								}}
								>
									{item.label}
								</Button>
							))}
							<Button
								variant="contained"
								component={Link}
								to="/request-quote"
								sx={{ ml: 2 }}
							>
								Get a Quote
							</Button>
						</Box>

						{/* Mobile menu button */}
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ display: { sm: 'none' } }}
						>
							{mobileOpen ? <CloseIcon /> : <MenuIcon />}
						</IconButton>
					</Toolbar>
				</Container>
			</AppBar>

			{/* Mobile Navigation Drawer */}
			<Drawer
				variant="temporary"
				anchor="top"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{ keepMounted: true }}
				PaperProps={{ role: 'dialog', 'aria-label': 'Main navigation' }}
				sx={{
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': {
						top: 64,
						bgcolor: 'background.paper',
						borderTop: 1,
						borderColor: 'divider'
					}
				}}
			>
				<Container maxWidth="lg">
					<List sx={{ py: 2 }}>
						{menuItems.map((item) => (
							<ListItem key={item.path} disablePadding>
								<ListItemButton
									component={Link}
									to={item.path}
									onClick={handleDrawerToggle}
								>
									<ListItemText primary={item.label} />
								</ListItemButton>
							</ListItem>
						))}
						<ListItem disablePadding>
							<ListItemButton
								component={Link}
								to="/request-quote"
								onClick={handleDrawerToggle}
								sx={{ mt: 1 }}
							>
								<Button variant="contained" fullWidth>
									Get a Quote
								</Button>
							</ListItemButton>
						</ListItem>
					</List>
				</Container>
			</Drawer>

			<Box component="main" id="main-content">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/calculator" element={<Calculator />} />
					<Route path="/about" element={<About />} />
					<Route path="/faq" element={<FAQ />} />
					<Route path="/request-quote" element={<RequestQuote onOpen={() => {}} />} />
				</Routes>
			</Box>
			
			<Footer />
		</Box>
	)
}

export default App
