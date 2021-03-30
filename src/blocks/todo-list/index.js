import ReduxTodoEdit from './edit';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import './ToDoInfo';

const themeName = 'mytheme-blocks';

registerBlockType(`${themeName}/todo-list`, {
    title: __('Redux Todo List', themeName),
    description: __('A todo list', themeName),
    icon: 'admin-post',
    category: 'mytheme-category',
    edit: ReduxTodoEdit,
    save() {
        return null;
    },
});
