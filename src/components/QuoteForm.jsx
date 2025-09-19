import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Typography,
  Chip,
  IconButton
} from '@mui/material'
import { Close as CloseIcon, Security, NoEncryption, Verified } from '@mui/icons-material'

export default function QuoteForm({ open, onClose, onSubmit }) {
    const [step, setStep] = useState(0)
    const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', timeframe: '30', consent: false })

    const steps = ['Contact', 'Details']

    function handleChange(e) {
        const { name, value, type, checked } = e.target
        setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        onSubmit?.(form)
        setStep(0)
        setForm({ name: '', email: '', phone: '', address: '', timeframe: '30', consent: false })
    }

    const isStepValid = () => {
        if (step === 0) {
            return form.name && form.email
        }
        if (step === 1) {
            return form.address && form.consent
        }
        return false
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                elevation: 8,
                sx: { borderRadius: 3 }
            }}
        >
            <DialogTitle sx={{ pb: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" component="h2" fontWeight={600}>
                        Request a Quote
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ px: 3, py: 2 }}>
                {/* Progress Stepper */}
                <Stepper activeStep={step} sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box component="form" onSubmit={handleSubmit}>
                    {step === 0 && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <TextField
                                name="name"
                                label="Full Name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                fullWidth
                                autoFocus
                            />
                            <TextField
                                name="email"
                                label="Email Address"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                fullWidth
                                helperText="We'll send your quote here"
                            />
                            <TextField
                                name="phone"
                                label="Phone Number"
                                type="tel"
                                value={form.phone}
                                onChange={handleChange}
                                fullWidth
                                helperText="Optional - for faster follow-up"
                            />
                        </Box>
                    )}

                    {step === 1 && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <TextField
                                name="address"
                                label="Installation Address"
                                value={form.address}
                                onChange={handleChange}
                                required
                                fullWidth
                                helperText="Where will the solar panels be installed?"
                            />
                            <FormControl fullWidth>
                                <InputLabel>Installation Timeframe</InputLabel>
                                <Select
                                    name="timeframe"
                                    value={form.timeframe}
                                    onChange={handleChange}
                                    label="Installation Timeframe"
                                >
                                    <MenuItem value="30">Within 30 days</MenuItem>
                                    <MenuItem value="60">Within 60 days</MenuItem>
                                    <MenuItem value="90">Within 90 days</MenuItem>
                                    <MenuItem value="120">3+ months</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="consent"
                                        checked={form.consent}
                                        onChange={handleChange}
                                        required
                                    />
                                }
                                label="I agree to be contacted about my solar quote"
                            />
                        </Box>
                    )}
                </Box>

                {/* Trust Signals */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    mt: 4, 
                    pt: 3, 
                    borderTop: 1, 
                    borderColor: 'divider',
                    flexWrap: 'wrap',
                    gap: 1
                }}>
                    {[
                        { icon: Security, text: 'Secure & private' },
                        { icon: NoEncryption, text: 'No spam ever' },
                        { icon: Verified, text: 'Trusted installers' }
                    ].map((item, index) => (
                        <Chip
                            key={index}
                            icon={<item.icon fontSize="small" />}
                            label={item.text}
                            variant="outlined"
                            size="small"
                            sx={{ fontSize: '0.75rem' }}
                        />
                    ))}
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
                {step > 0 && (
                    <Button onClick={() => setStep(step - 1)}>
                        Back
                    </Button>
                )}
                <Button
                    variant="contained"
                    onClick={step === 1 ? handleSubmit : () => setStep(1)}
                    disabled={!isStepValid()}
                    sx={{ ml: 'auto' }}
                >
                    {step === 1 ? 'Submit Quote Request' : 'Next'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
