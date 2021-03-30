import LatestPostsEdit from './edit';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

const themeName = 'mytheme-blocks';

registerBlockType(`${themeName}/latest-posts`, {
    title: __('Latests Posts', themeName),
    description: __('Block showing the latest posts.', themeName),
    icon: 'admin-post',
    category: 'mytheme-category',
    edit: LatestPostsEdit,
    save() {
        return null;
    },
});
