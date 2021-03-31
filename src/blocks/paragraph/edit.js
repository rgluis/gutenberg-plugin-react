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
import { PanelBody, ColorPalette } from '@wordpress/components';
import classnames from 'classnames';

class ParagraphEdit extends Component {
    onChangeContent = (content) => this.props.setAttributes({ content });

    onChangeAlignment = (textAlignment) =>
        this.props.setAttributes({ textAlignment });

    render() {
        console.log('paragraph this.props', this.props);
        const {
            className,
            attributes,
            setTextColor,
            setBackgroundColor,
            backgroundColor,
            textColor,
        } = this.props;
        const { content, textAlignment } = attributes;
        const classes = classnames(className, {});

        return (
            <>
                <InspectorControls>
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
                        title={__('Color Palette Example', 'mytheme-blocks')}
                    >
                        <ColorPalette
                            colors={[{ color: '#f03' }, { color: 'blue' }]}
                            onChange={setBackgroundColor}
                        />
                    </PanelBody>
                </InspectorControls>
                <BlockControls>
                    <AlignmentToolbar
                        isCollapsed={false}
                        value={textAlignment}
                        onChange={(value) => this.onChangeAlignment(value)}
                    />
                </BlockControls>
                <RichText
                    tagName="p"
                    className={classes}
                    onChange={this.onChangeContent}
                    value={content}
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

export default withColors('backgroundColor', { textColor: 'color' })(
    ParagraphEdit
);
