# Final Week - PulseBoard Mini Analytics Dashboard

## Overview

PulseBoard is a responsive mini web application that combines the skills
covered throughout the internship tasks:

- Responsive frontend design
- Vanilla JavaScript interactivity
- Static JSON data
- Dynamic data rendering
- Filtering and sorting
- Data visualization
- Accessibility and ARIA
- Keyboard-friendly navigation
- Performance optimization
- Error handling
- Documentation

## Files

```text
final-mini-dashboard/
├── index.html
├── style.css
├── app.js
├── data.json
├── README.md
└── FINAL_PROJECT_REPORT.md
```

## How to Run

Because the dashboard loads `data.json` using `fetch()`, open it through a
local web server rather than directly with `file://`.

### VS Code Live Server

1. Open the project folder in VS Code.
2. Install/use Live Server.
3. Open `index.html` with Live Server.

### Python

From the project folder:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Interactive Features

- Dynamic KPI cards.
- Monthly sales bar chart.
- Switch between bar chart and sales table.
- Activity filtering by status.
- Activity sorting by date and amount.
- Refresh data button.
- Responsive mobile navigation.
- Keyboard-accessible controls.
- Live status messages.

## Accessibility

- Semantic landmarks.
- Skip link.
- Native buttons and select controls.
- ARIA expanded state for mobile navigation.
- Live status region.
- Descriptive labels.
- Keyboard navigation.
- Visible focus indicators.
- Accessible data table with table headers.
- Reduced-motion support.

## Performance

- JavaScript uses `defer`.
- Small custom CSS with no framework dependency.
- Small static JSON dataset.
- Limited DOM updates.
- No unnecessary polling.
- No external chart library.
- Responsive CSS with a small component structure.

## Testing

Test desktop, tablet, and mobile layouts.

Keyboard test:
- Tab through controls.
- Open mobile navigation with keyboard.
- Change filters using the select controls.
- Activate Refresh data with Enter/Space.

Data test:
- Confirm KPI values are displayed.
- Change the activity filter.
- Change sorting.
- Switch chart/table view.

Browser test:
- Chrome
- Edge
- Firefox

Accessibility test:
- Lighthouse Accessibility
- Keyboard-only navigation
- Browser accessibility tree/manual inspection

Performance test:
- Lighthouse Performance
- Network panel
- Check that app.js is deferred and data.json is loaded only when needed.
