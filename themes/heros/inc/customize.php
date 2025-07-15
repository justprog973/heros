<?php

function _themenamme_customize_register(WP_Customize_Manager $manager): void
{
    $manager->get_setting('blogname')->transport = 'postMessage';

    $manager->selective_refresh->add_partial('blogname', [
        //'settings' => ['blogname'],
        'selector' => '.jp-site-brand__name',
        'container_inclusive' => false,
        'render_callback' => function () {
            bloginfo('name');
        }
    ]);

    /*#####################  SINGLE SETTINGS  #################################*/

    $manager->add_section('_themename_single_blog_options', [
        'title' => esc_html__('Blog', '_themename'),
        'description' => esc_html__('Update setting blog here', '_themename'),
        /*'active_callback' => '_themename_show_single_blog_section'*/
    ]);

    $manager->add_setting('_themename_display_author_info', array(
        'default' => true,
        'transport' => 'postMessage',
        'sanitize_callback' => '_themename_sanitize_checkbox'
    ));

    $manager->add_control('_themename_display_author_info', array(
        'type' => 'checkbox',
        'label' => esc_html__('Display infos author ?', '_themename'),
        'section' => '_themename_single_blog_options'
    ));

    function _themename_sanitize_checkbox($checked)
    {
        return isset($checked) && $checked === true;
    }

    /*function _themename_show_single_blog_section()
    {
        global $post;
        return is_single() && $post->post_type === 'post';
    }*/

    /*#####################  ARCHIVE SETTINGS  #################################*/

    $manager->add_section('_themename_archive_options', [
        'title' => esc_html__('Archive', '_themename'),
        'description' => esc_html__('Update setting archive here', '_themename'),
        /*'active_callback' => '_themename_show_single_blog_section'*/
    ]);

    $manager->add_setting('_themename_header_coulour', array(
        'default' => '#c3c3c3',
        'transport' => 'postMessage',
        'sanitize_callback' => 'sanitize_hex_color'
    ));

    $manager->add_control(new WP_Customize_Color_Control($manager, '_themename_header_coulour',[
        'label' => __('Header Color', '_themename'),
        'section' => '_themename_archive_options',
    ]));

    /*#####################  GENERAL SETTINGS  #################################*/

    $manager->add_section('_themename_general_options', [
        'title' => esc_html__('General', '_themename'),
        'description' => esc_html__('Vous pouvez modifier les options générales à partir d\'ici.', '_themename')
    ]);

    $manager->add_setting('_themename_accent_colour', [
        'default' => '#009cad',
        'transport' => 'postMessage',
        'sanitize_callback' => 'sanitize_hex_color'
    ]);

    $manager->add_control(new WP_Customize_Color_Control($manager, '_themename_accent_colour', [
        'label' => __('Accent Color', '_themename'),
        'section' => '_themename_general_options',
    ]));

    $manager->add_setting('_themename_text_link_colour', [
        'default' => '#009cad',
        'transport' => 'postMessage',
        'sanitize_callback' => 'sanitize_hex_color'
    ]);

    $manager->add_control(new WP_Customize_Color_Control($manager, '_themename_text_link_colour', [
        'label' => __('Text Link Color', '_themename'),
        'section' => '_themename_general_options',
    ]));

    /*#####################  FOOTER SETTINGS  #################################*/

    $manager->selective_refresh->add_partial('_themename_footer_partial', [
        'settings' => ['_themename_footer_bg', '_themename_footer_layout'],
        'selector' => '#footer',
        'container_inclusive' => false,
        'render_callback' => function () {
            get_template_part('footer');
        }
    ]);

    $manager->add_section('_themename_footer_options', [
        'title' => esc_html__('Footer', '_themename'),
        'description' => esc_html__('You can change footer options from here', '_themename')
    ]);

    $manager->add_setting('_themename_site_info', [
        'default' => '',
        'sanitize_callback' => '_themename_sanitize_site_info',
        'transport' => 'postMessage'
    ]);

    $manager->add_control('_themename_site_info', [
        'type' => 'text',
        'label' => esc_html__('Site info', '_themename'),
        'section' => '_themename_footer_options'
    ]);

    $manager->add_setting('_themename_footer_bg', array(
        'default' => 'dark',
        'transport' => 'postMessage',
        'sanitize_callback' => '_themename_sanitize_footer_bg'
    ));

    $manager->add_control('_themename_footer_bg', array(
        'type' => 'select',
        'label' => esc_html__('Footer Background', '_themename'),
        'choices' => array(
            'light' => esc_html__('Light', '_themename'),
            'dark' => esc_html__('Dark', '_themename'),
        ),
        'section' => '_themename_footer_options'
    ));

    $manager->add_setting('_themename_footer_layout', array(
        'default' => '3,3,3,3',
        'transport' => 'postMessage',
        'sanitize_callback' => 'sanitize_text_field',
        'validate_callback' => '_themename_validate_footer_layout'
    ));

    $manager->add_control('_themename_footer_layout', [
        'type' => 'text',
        'label' => esc_html__('Footer layout', '_themename'),
        'section' => '_themename_footer_options'
    ]);

}

add_action('customize_register', '_themenamme_customize_register');

function _themename_validate_footer_layout($validity, $value)
{
    if (!preg_match('/^([1-9]|1[012])(,([1-9]|1[012]))*$/', $value)) {
        $validity->add('invalid_footer_layout', esc_html__('Footer layout is invalid', '_themename'));
    }
    return $validity;
}

function _themename_sanitize_footer_bg($input)
{
    $valid = array('light', 'dark');
    if (in_array($input, $valid, true)) {
        return $input;
    }
    return 'dark';
}


function _themename_sanitize_site_info($input): string
{

    $allowed = ['a' => [
        'href' => [],
        'title' => []
    ]];

    return wp_kses($input, $allowed);
}
