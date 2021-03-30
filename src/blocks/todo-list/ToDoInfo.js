import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';

const themeName = 'mytheme-blocks';

let TodoCount = (props) => {
    return (
        <div>
            <p>Total: {props.total}</p>
            <p>Todo: {props.todo}</p>
            <p>done: {props.done}</p>
        </div>
    );
};

TodoCount = withSelect((select) => {
    return {
        total: select('mytheme-blocks/todo').getToDosNumber(),
        todo: select('mytheme-blocks/todo').getUnDoneToDosNumber(),
        done: select('mytheme-blocks/todo').getDoneToDosNumber(),
    };
})(TodoCount);

registerBlockType(`${themeName}/todo-list-count`, {
    title: __('Redux Todo List Count', themeName),
    description: __('A todo list count', themeName),
    icon: 'admin-post',
    category: 'mytheme-category',
    edit: TodoCount,
    save() {
        return null;
    },
});
