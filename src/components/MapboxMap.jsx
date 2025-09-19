import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Box } from '@mui/material'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

export default function MapboxMap({ lat, lon, onChange, height = 300 }) {
	const mapRef = useRef(null)
	const containerRef = useRef(null)

	useEffect(() => {
		if (!MAPBOX_TOKEN) {
			console.warn('VITE_MAPBOX_TOKEN not set')
			return
		}
		mapboxgl.accessToken = MAPBOX_TOKEN
		const initial = { lng: lon ?? -122.4194, lat: lat ?? 37.7749, zoom: 9 }
		const map = new mapboxgl.Map({
			container: containerRef.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [initial.lng, initial.lat],
			zoom: initial.zoom,
			attributionControl: true,
			optimizeForTerrain: false,
			collectResourceTiming: false,
		})

		mapRef.current = map

		const marker = new mapboxgl.Marker({ draggable: true })
			.setLngLat([initial.lng, initial.lat])
			.addTo(map)

		function handleDragEnd() {
			const { lat, lng } = marker.getLngLat()
			onChange?.({ lat, lon: lng })
		}
		marker.on('dragend', handleDragEnd)

		return () => {
			marker.off('dragend', handleDragEnd)
			map.remove()
		}
	}, [])

    return (
        <Box
            ref={containerRef}
            sx={{
                width: '100%',
                height,
                borderRadius: 2,
                overflow: 'hidden',
                border: 1,
                borderColor: 'divider',
                willChange: 'transform'
            }}
        />
    )
}
