import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
    RichText,
    BlockControls,
    AlignmentToolbar,
    InspectorControls,
    PanelColorSettings,
    withColors,
    ContrastChecker,
} from '@wordpress/block-editor';
import {
    Toolbar,
    DropdownMenu,
    PanelBody,
    ToggleControl,
    ColorPicker,
    ColorPalette,
    RangeControl,
} from '@wordpress/components';
import classnames from 'classnames';

class Edit extends Component {
    onChangeContent = (content) => this.props.setAttributes({ content });
    onChangeAlignment = (textAlignment) =>
        this.props.setAttributes({ textAlignment });
    toggleShadow = () => {
        this.props.setAttributes({ shadow: !this.props.attributes.shadow });
    };
    onChangeShadowOpacity = (shadowOpacity) => {
        this.props.setAttributes({ shadowOpacity });
    };

    render() {
        const {
            className,
            attributes,
            setTextColor,
            setBackgroundColor,
            backgroundColor,
            textColor,
        } = this.props;
        const { content, textAlignment, shadow, shadowOpacity } = attributes;
        const classes = classnames(className, {
            'has-shadow': shadow,
            [`shadow-opacity-${shadowOpacity * 100}`]: shadowOpacity,
        });

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Settings', 'mytheme-blocks')}>
                        {shadow && (
                            <RangeControl
                                label={__('Shadow Opacity', 'mytheme-blocks')}
                                value={shadowOpacity}
                                onChange={this.onChangeShadowOpacity}
                                min={0.1}
                                max={0.4}
                                step={0.1}
                            />
                        )}
                    </PanelBody>
                    <PanelColorSettings
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
                    </PanelColorSettings>
                    <PanelBody
                        initialOpen={false}
                        title={__('Toggle Example', 'mytheme-blocks')}
                    >
                        <ToggleControl
                            label="werwe"
                            onChange={(v) => console.log(v)}
                        />
                    </PanelBody>
                    <PanelBody
                        initialOpen={false}
                        title={__('Color Picker Example', 'mytheme-blocks')}
                    >
                        <ColorPicker
                            color={textColor.color}
                            onChangeComplete={setTextColor}
                        />
                    </PanelBody>
                    <PanelBody
                        initialOpen={false}
                        title={__('Color Palette Example', 'mytheme-blocks')}
                    >
                        <ColorPalette
                            colors={[{ color: '#f03' }, { color: 'blue' }]}
                            onChange={setBackgroundColor}
                        />
                    </PanelBody>
                </InspectorControls>
                <BlockControls
                    controls={[
                        {
                            icon: (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    enableBackground="new 0 0 24 24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                >
                                    <rect fill="none" height="24" width="24" />
                                    <path d="M18,20V8.35L13.65,4h-2.83L16,9.18V20H18z M22,20V6.69L19.31,4h-2.83L20,7.52V20H22z M8,4l-6,6v10h5v-5h2v5h5V10L8,4z M9,13 H7v-2h2V13z" />
                                </svg>
                            ),
                            title: __('Shadow', 'mytheme-blocks'),
                            onClick: this.toggleShadow,
                            isActive: shadow,
                        },
                    ]}
                >
                    <AlignmentToolbar
                        isCollapsed={false}
                        value={textAlignment}
                        onChange={(value) => this.onChangeAlignment(value)}
                    />
                    <Toolbar
                        isCollapsed={false}
                        controls={[
                            [
                                {
                                    icon: 'wordpress',
                                    title: __('test', 'mytheme-blocks'),
                                    onClick: () => alert(true),
                                    isActive: false,
                                },
                            ],
                            [
                                {
                                    icon: 'wordpress',
                                    title: __('test2', 'mytheme-blocks'),
                                    onClick: () => alert(true),
                                    isActive: false,
                                },
                            ],
                        ]}
                    />
                    {content && content.length > 0 && (
                        <Toolbar>
                            <DropdownMenu
                                icon="editor-table"
                                label={__('test', 'mytheme-blocks')}
                                controls={[
                                    [
                                        {
                                            icon: 'wordpress',
                                            title: __('test', 'mytheme-blocks'),
                                            onClick: () => alert(true),
                                            isActive: false,
                                        },
                                    ],
                                    [
                                        {
                                            icon: 'wordpress',
                                            title: __(
                                                'test2',
                                                'mytheme-blocks'
                                            ),
                                            onClick: () => alert(true),
                                            isActive: false,
                                        },
                                    ],
                                ]}
                            />
                        </Toolbar>
                    )}
                </BlockControls>
                <RichText
                    tagName="h4"
                    className={classes}
                    onChange={this.onChangeContent}
                    value={content}
                    formattingControls={['bold']}
                    style={{
                        textAlign: textAlignment,
                        backgroundColor: backgroundColor.color,
                        color: textColor.color,
                    }}
                />
            </>
        );
    }
}

export default withColors('backgroundColor', { textColor: 'color' })(Edit);
