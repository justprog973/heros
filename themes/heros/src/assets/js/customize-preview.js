import $ from 'jquery';
import stripTags from "./helpers/strip-tags.js";

    wp.customize('blogname', (value)=> {
        value.bind((to) => {
            $('.jp-site-brand__name').html(stripTags(to));
        });
    });

    wp.customize('_themename_display_author_info', (value)=> {
        value.bind((to) => {
            if(to) {
                $('.j-post-author').show();
            }else {
                $('.j-post-author').hide();
            }
        });
    });

    wp.customize('_themename_accent_colour', (value)=> {
        value.bind((to) => {
            let inline_css = ``;
            let inline_css_obj = _themename['inline-css'];
            for(let selector in inline_css_obj){
                inline_css += `${selector} {`;
                    for(let prop in inline_css_obj[selector]){
                        let val = inline_css_obj[selector][prop];
                        //wp.customize(val[0]).get()}${val.length === 2 ? `${val[1]};` : ';'
                        inline_css += `${prop}: ${wp.customize(val).get()};`;
                    }
                inline_css += `}`;
            }
            console.log(inline_css);
            $('#_themename-stylesheet-inline-css').html(inline_css);
        });
    });

    wp.customize('_themename_text_link_colour', (value)=> {
        value.bind((to) => {
            let inline_css = ``;
            let inline_css_obj = _themename['inline-css'];
            for(let selector in inline_css_obj){
                inline_css += `${selector} {`;
                for(let prop in inline_css_obj[selector]){
                    let val = inline_css_obj[selector][prop];
                    //wp.customize(val[0]).get()}${val.length === 2 ? `${val[1]};` : ';'
                    inline_css += `${prop}: ${wp.customize(val).get()};`;
                }
                inline_css += `}`;
            }
            console.log(inline_css);
            $('#_themename-stylesheet-inline-css').html(inline_css);
        });
    });

    wp.customize('_themename_header_coulour', (value)=> {
        value.bind((to) => {
            let inline_css = ``;
            let inline_css_obj = _themename['inline-css'];
            for(let selector in inline_css_obj){
                inline_css += `${selector} {`;
                for(let prop in inline_css_obj[selector]){
                    let val = inline_css_obj[selector][prop];
                    //wp.customize(val[0]).get()}${val.length === 2 ? `${val[1]};` : ';'
                    inline_css += `${prop}: ${wp.customize(val).get()};`;
                }
                inline_css += `}`;
            }
            console.log(inline_css);
            $('#_themename-stylesheet-inline-css').html(inline_css);
        });
    });

    wp.customize('_themename_site_info', (value)=> {
        value.bind((to) => {
            $('.jp-site-info__text').html(stripTags(to,'<a>'));
        });
    });
