import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import {
    InspectorControls,
    // ContrastChecker
} from '@wordpress/block-editor';
import {
    // PanelColorSettings,
    SelectControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
// import { meta } from '@sparkpost/design-tokens';

/* const colors = meta.filter(({ type }) => type === 'color');
const palettes = {
    grayscale: {
        label: 'Grayscale',
        colors: colors.filter(
            ({ name }) =>
                name.includes('gray') &&
                (!name.includes('brand') || name.includes('white'))
        ),
    },
    blue: {
        label: 'Blue',
        colors: colors.filter(({ name }) => name.includes('color-blue')),
    },
    red: {
        label: 'Red',
        colors: colors.filter(({ name }) => name.includes('color-red')),
    },
    yellow: {
        label: 'Yellow',
        colors: colors.filter(({ name }) => name.includes('color-yellow')),
    },
    magenta: {
        label: 'Magenta',
        colors: colors.filter(({ name }) => name.includes('color-magenta')),
    },
    teal: {
        label: 'Teal',
        colors: colors.filter(({ name }) => name.includes('color-teal')),
    },
    green: {
        label: 'Green',
        colors: colors.filter(({ name }) => name.includes('color-green')),
    },
    purple: {
        label: 'Purple',
        colors: colors.filter(({ name }) => name.includes('color-purple')),
    },
    brand: {
        label: 'Brand',
        colors: colors.filter(({ name }) => name.includes('brand')),
    },
}; */

const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        console.log(props);
        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls>
                    <SelectControl
                        label={__('Base color', 'mytheme-blocks')}
                        //options={baseColors}
                        //onChange={(value) => setSelectedBaseColor(value)}
                        //value={selectedBaseColor}
                    />
                    {/* <PanelColorSettings
                        title={__('Panel Color Settings')}
                        colorSettings={[
                            {
                                value: backgroundColor.color,
                                onChange: setBackgroundColor,
                                label: __('Background Color', 'mytheme-blocks'),
                            },
                            {
                                value: textColor.color,
                                onChange: setTextColor,
                                label: __('Text Color', 'mytheme-blocks'),
                            },
                        ]}
                    >
                        <ContrastChecker
                            textColor={textColor.color}
                            backgroundColor={backgroundColor.color}
                        />
                    </PanelColorSettings> */}
                </InspectorControls>
            </>
        );
    };
}, 'withInspectorControls');

addFilter(
    'editor.BlockEdit',
    'mytheme-blocks/with-inspector-control',
    withInspectorControls
);
