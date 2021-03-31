import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import ParagraphEdit from './edit';

const themeName = 'mytheme-blocks';

registerBlockType(`${themeName}/paragraph`, {
    title: __('Paragraph Clone', themeName),
    description: __('A paragraph block', themeName),
    icon: 'editor-paragraph',
    category: 'text',
    edit: ParagraphEdit,
    save() {
        return null;
    },
});
