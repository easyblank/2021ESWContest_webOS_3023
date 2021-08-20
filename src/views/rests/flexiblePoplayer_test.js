() => {
	const defaultOpen = false;
	const [open, setOpenState] = useState(defaultOpen);
	const toggleOpen = () => setOpenState(!open);
	const handleClose = compose(toggleOpen, action('onClose'));

	const defaultIndex = 0;
	const [index, setPanelIndexState] = useState(defaultIndex);

	const nextPanel = () => setPanelIndexState(Math.min(index + 1, 1));
	const handleNavigation = (type) => (ev) => {
		setPanelIndexState(ev.index);
		action(type)(ev);
	};

	const knobs = {
		fullHeight: boolean('fullHeight', Config),
		nextButtonVisibility: select('nextButtonVisibility', propOptions.buttonVisibility, Config),
		noAnimation: boolean('noAnimation', Config),
		noAutoDismiss: boolean('noAutoDismiss', Config),
		noCloseButton: boolean('noCloseButton', Config),
		prevButtonVisibility: select('prevButtonVisibility', propOptions.buttonVisibility, Config),
		scrimType: select('scrimType', ['none', 'translucent', 'transparent'], Config, 'translucent'),
		spotlightRestrict: select(
			'spotlightRestrict',
			['self-first', 'self-only'],
			Config,
			'self-only'
		)
	};

	// Knobs are ordered this way so "Panel" comes after the main component
	const size = select('size', propOptions.size, PanelConfig);

	return (
		<div>
			<FlexiblePopupPanels
				index={index}
				open={open}
				onBack={handleNavigation('onBack')}
				onChange={handleNavigation('onChange')}
				onClose={handleClose}
				onHide={action('onHide')}
				onNextClick={action('onNextClick')}
				onPrevClick={action('onPrevClick')}
				onShow={action('onShow')}
				{...knobs}
			>
				<Panel
					size={size}
					prevButton={
						boolean('custom first Panel prevButton', PanelConfig) ? (
							<Button icon="jumpbackward" aria-label="go to last" />
						) : (
							void 0
						)
					}
				>
					<Header title="First List" />
					<Scroller style={{width: size === 'auto' ? ri.scaleToRem(900) : null}}>
						<Item onClick={nextPanel}>Item 1</Item>
						<Item onClick={nextPanel}>Item 2</Item>
						<Item onClick={nextPanel}>Item 3</Item>
						<Item onClick={nextPanel}>Item 4</Item>
					</Scroller>
				</Panel>
				<Panel size={size}>
					<Header title="Second Vertical Slider" />
					<Slider orientation="vertical" defaultValue={50} style={{height: ri.scaleToRem(600)}} />
				</Panel>
				<Panel
					size={size}
					nextButton={
						boolean('custom last Panel nextButton', PanelConfig) ? (
							<Button icon="jumpforward" aria-label="go back to first" />
						) : (
							void 0
						)
					}
				>
					<Header title="Third panel" />
					<Scroller style={{width: size === 'auto' ? ri.scaleToRem(900) : null}}>
						<Item onClick={nextPanel}>Item 1</Item>
					</Scroller>
				</Panel>
			</FlexiblePopupPanels>
			<Button onClick={toggleOpen}>Open FlexiblePopupPanels</Button>
		</div>
	);
}