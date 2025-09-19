import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Chip, 
  
  Card, 
  CardContent,
  useTheme,
  alpha 
} from '@mui/material';
import { CheckCircle, Insights, AccessTime } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Hero() {
  const theme = useTheme();
  
  return (
    <Box
      component="section"
      sx={{
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 50%, ${alpha(theme.palette.info.main, 0.1)} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(8, 145, 178, 0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.4,
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            textAlign: 'center',
            py: { xs: 10, sm: 14, md: 18 },
            px: { xs: 2, sm: 3 }
          }}
        >
          {/* Trust Badge */}
          <Chip
            label="Simple • Accurate • Trusted"
            sx={{
              mb: 3,
              bgcolor: alpha(theme.palette.grey[100], 0.8),
              color: theme.palette.text.secondary,
              fontWeight: 500,
              '&:hover': {
                bgcolor: alpha(theme.palette.grey[200], 0.8),
              }
            }}
          />

          {/* Headline */}
          <Typography
            variant="h1"
            component="h1"
            sx={{
              mb: 3,
              color: theme.palette.primary.main,
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              lineHeight: 1.2,
              maxWidth: { xs: '90%', sm: '80%', md: '70%' },
              mx: 'auto'
            }}
          >
            Plan your solar with confidence
          </Typography>

          {/* Subheading */}
          <Typography
            variant="h5"
            component="p"
            sx={{
              mb: 5,
              color: theme.palette.text.secondary,
              fontWeight: 400,
              fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
              lineHeight: 1.5,
              maxWidth: { xs: '85%', sm: '75%', md: '65%' },
              mx: 'auto'
            }}
          >
            Size your solar system and savings in minutes. No sales pressure—just clear, data‑driven guidance.
          </Typography>

          {/* Value bullets */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 2,
            maxWidth: 900,
            mx: 'auto',
            mb: 4,
          }}>
            {[
              { icon: <Insights fontSize="small" />, text: 'Uses real irradiance data' },
              { icon: <CheckCircle fontSize="small" />, text: 'Accurate sizing & savings' },
              { icon: <AccessTime fontSize="small" />, text: 'Takes ~3 minutes' },
            ].map((item, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, color: 'text.secondary' }}>
                <Box sx={{ color: 'primary.main' }}>{item.icon}</Box>
                <Typography variant="caption">{item.text}</Typography>
              </Box>
            ))}
          </Box>

          {/* CTAs */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexDirection: { xs: 'column', sm: 'row' },
              mb: 8,
              px: { xs: 2, sm: 0 }
            }}
          >
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/calculator"
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                borderRadius: 2,
                minWidth: { xs: '100%', sm: 200 }
              }}
            >
              Start your estimate
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/about"
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                borderRadius: 2,
                minWidth: { xs: '100%', sm: 200 },
                borderColor: alpha(theme.palette.primary.main, 0.3),
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  bgcolor: alpha(theme.palette.primary.main, 0.04)
                }
              }}
            >
              How it works
            </Button>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mb: 3 }}>
            It takes about 3 minutes. You can try it without your address.
          </Typography>

          {/* Trust chips */}
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap', mb: 6 }}>
            {['Powered by PVWatts (NREL)', 'Vetted installers', 'No spam'].map((label) => (
              <Chip key={label} label={label} size="small" variant="outlined" />
            ))}
          </Box>

          {/* As seen in (placeholder logos) */}
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap', opacity: 0.8, mb: 4 }}>
            {['EnergyNews', 'SolarToday', 'GreenTech'].map((brand) => (
              <Typography key={brand} variant="caption" color="text.secondary">
                {brand}
              </Typography>
            ))}
          </Box>

          {/* Social Proof Grid */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(4, minmax(0, 1fr))' },
            gap: 2,
            justifyItems: 'stretch'
          }}>
            {[
              { value: '25k+', label: 'Calculations completed' },
              { value: '4.9/5', label: 'Customer satisfaction' },
              { value: '10k+', label: 'Installations assisted' },
              { value: '$150M', label: 'Estimated savings' }
            ].map((stat, index) => (
              <Box key={index}>
                <Card
                  elevation={1}
                  sx={{
                    bgcolor: alpha(theme.palette.background.paper, 0.8),
                    backdropFilter: 'blur(8px)',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[4],
                    },
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                        mb: 0.5
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontSize: '0.75rem'
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
