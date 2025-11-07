# Bishop Rock Lighthouse Interactive Signal

Reimagining a lighthouse signal as an interactive experience.

---

## Overview

This project transforms the iconic **Fl(2) W 15s** signal of **Bishop Rock Lighthouse** into a digital-physical, interactive experience. Instead of simply replicating the lighthouse’s physical model, it translates the signature rhythm into a system that users can explore in real time.  

Users can adjust brightness, sequence speed, and animation effects instantly, creating a dynamic and tactile experience. No Wi-Fi setup or technical knowledge is required. This project bridges maritime heritage with contemporary interaction, making the lighthouse’s legacy tangible in a playful, modern way.

---

## Features

- **Interactive Lighthouse Signal**: Adjust LED brightness, speed, and visual effects like sweep and pulse.
- **Instant Feedback**: Changes are reflected immediately through the microcontroller.
- **Accessible Interface**: Simple, intuitive controls designed for anyone to explore.
- **Sustainable Design**: Efficient firmware and eco-conscious hardware choices extend longevity and reduce power consumption.

---

## Technical Details

### Firmware

- Developed on **Arduino/ESP8266**
- Uses **FastLED** to create precise LED sequences
- Implements a **custom state machine** to faithfully recreate the double-flash pattern
- Supports multiple user-controlled modes for dynamic interaction

### Software

- **React-based captive portal** for real-time control
- Communicates directly with the microcontroller via HTTP/WebSocket
- Allows instant adjustments to intensity, speed, and animation effects
- Seamlessly integrates digital input with physical output for responsive interaction

---

## Design Goals

1. **Clarity and Usability**: Intuitive layouts and immediate feedback.
2. **Heritage Meets Playfulness**: Preserves the lighthouse’s signature rhythm in a modern, engaging way.
3. **Sustainability**: Efficient firmware design to reduce electronic waste and maximise hardware lifespan.
