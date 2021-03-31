import { addFilter } from '@wordpress/hooks';

function colorAttributesControl(settings) {
    console.log(settings);
    //check if object exists for old Gutenberg version compatibility
    if (typeof settings.attributes !== 'undefined') {
        settings.attributes = Object.assign(settings.attributes, {
            mythemeBlocksBackgroundColor: {
                type: 'string',
            },
            mythemeBlocksTextColor: {
                type: 'string',
            },
        });
    }

    return settings;
}
addFilter(
    'blocks.registerBlockType',
    'mytheme-blocks/color-attributes-control',
    colorAttributesControl
);
