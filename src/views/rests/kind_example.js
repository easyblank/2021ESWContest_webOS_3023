import css from './Button.module.less';
const Button = kind({
	name: 'Button',
	// Return a functional component suitable for use with React hooks
	functional: true,
	// expect color and onClick properties but neither required
	propTypes: {
		color: PropTypes.string
	},
	// if no color is provided, it'll be green
	defaultProps: {
		color: 'green'
	},
	// expect backgroundColor via context
	contextType: React.createContext({ backgroundColor }),
	// configure styles with the static className to merge with user className
	styles: {
		// include the CSS modules map so 'button' can be resolved to the local name
		css,
		className: 'button'
	},
	// add event handlers that are cached between calls to prevent recreating each call. Any
	// handlers are added to the props passed to `render()`.  See core/handle.
	handlers: {
		onKeyDown: (evt, props) => { .... }
	},
	// add some computed properties, these are added to props passed to `render()`
	computed: {
		// border color will be the color prepended by 'light'
		borderColor: ({color}) => 'light' + color,
		// background color will be the contextual background color if specified
		color: ({color}, context) => context.backgroundColor || color
	},
	// Render the thing, already!
	render: ({color, borderColor, children, ...rest}) => (
		<button
			{...rest}
			style={{backgroundColor: color, borderColor}}
		>
			{children}
		</button>
	)
});