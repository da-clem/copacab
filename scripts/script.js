const SURFACE_JARDIN_OPTION = 'surface-jardin';
const COLOR_EXT_JARDIN_OPTION = 'color-ext-jardin';
const PORTE_JARDIN_OPTION = 'porte-jardin';
const ISOLATION_JARDIN_OPTION = 'isolation-jardin';

const SURFACE_OPTION = 'surface';
const DESIGN_OPTION = 'design';
const DESIGN2_OPTION = 'design2';
const SOL_OPTION = 'sol';
const PILOTIS_OPTION = 'pilotis';
const COLOR_EXT_OPTION = 'color-ext';
const MONTAGE_OPTION = 'montage';

const URL_PREFIXE_AVIVRE = 'a-vivre-';
const URL_PREFIXE_JARDIN = 'jardin-';
const URL_PREFIXE_ENFANTS = 'enfants-'
const URL_PREFIXE_ANIMAUX = 'animaux-'

let selectOptionColorExtJardinId = '';
let selectOptionPorteJardinId = '';
let selectOptionIsolationJardinId = '';
var product = {
    'name': '',
    'surface': '',
    'price': {}
};

let values = {
    'colorValue': '',
    'porteValue': '',
    'isoValue': ''
}

// var
let pilotisPristine = false;
let montagePristine = false;
let selectedOptions = {
    [SURFACE_OPTION]: '',
    [DESIGN_OPTION]: '',
    [DESIGN2_OPTION]: '',
    [SOL_OPTION]: '',
    [COLOR_EXT_OPTION]: '',
    [PILOTIS_OPTION]: '',
    [MONTAGE_OPTION]: '',
    "DESIGN_SHOW_PRICE": false,
    "DESIGN2_SHOW_PRICE": false,
    "SOL_SHOW_PRICE": false,
    "COLOR_EXT_SHOW_PRICE": false,
    "PILOTIS_SHOW_PRICE": false,
    "MONTAGE_SHOW_PRICE": false,
    [COLOR_EXT_JARDIN_OPTION]: ''
};
var sizeSelected = {};
var price = 0;
var colorArray = ['noir', 'rouge', 'vert', 'gris', 'bleu'];


// ----------------
// Script produit
// ----------------


function setValueToSelectBlock(blockAttr, optionsArray) {
    optionsArray.each(function (i, option) {
        if (i != 0) {
            $('[' + blockAttr + '=' + option.text + ']').attr('value', option.value);
        }
    });
}

function updateAll(id) {
    s = $('.addtocard-jardin select#' + id);
    for (let i = 0; i < s.length; i++) {
        setTimeout(el => {
            const e = document.createEvent('HTMLEvents');
            e.initEvent('change', true, true);
            el.dispatchEvent(e);
        },
            i * 5, s[i])
    };
}


function kobeAmenagementHandle() {
    $('[design-old=nue]').click(function (e) {
        // selectItem('designKobe', e);
        // $('#'+formFieldId).val('sansAmenagement_v1');
        $('[design=sansAmenagement_v1]').click();
    });
    $('[design=sansAmenagement_v1]').click(function (e) {
        $('.select-nue').hasClass('selected') ? null : $('.select-nue').addClass('selected');
        $(".select-amenage").removeClass('noBorder');
    });
    $('[design=sansAmenagement_v2]').click(function (e) {
        $('.select-nue').hasClass('selected') ? null : $('.select-nue').addClass('selected');
        $(".select-amenage").removeClass('noBorder');
    });
    $("[design='amenagement_v1']").click(function (e) {
        $(".select-nue").removeClass('selected');
        $(".select-amenage").addClass('noBorder');
    });
    // $('#'+formFieldId).val(value);
    // selectedOptions[attrName]=value;
}

function amenagementIlotHandle() {
    $('[design-old=amenage]').click(function (e) {
        // selectItem('designKobe', e);
        // $('#'+formFieldId).val('sansAmenagement_v1');
        $('[design=amenagement_v1]').click();
    });
    $('[design=amenagement_v1]').click(function (e) {
        $('.select-nue').removeClass('selected');
        $('.select-amenage').hasClass('selected') ? null : $('.select-amenage').addClass('selected');
    });
    $('[design=amenagement_v2]').click(function (e) {
        $('.select-nue').removeClass('selected');
        $('.select-amenage').hasClass('selected') ? null : $('.select-amenage').addClass('selected');
    });
    $('[design=sansAmenagement_v1]').click(function (e) {
        $(".select-amenage").removeClass('selected');
    });

    // $('#'+formFieldId).val(value);
    // selectedOptions[attrName]=value;
}

function init() {
    var arr = [[SURFACE_OPTION, (product.name === 'kobe') ? '16' : '20'], [DESIGN_OPTION, 'sansAmenagement_v1'], [DESIGN2_OPTION, 'base'], [SOL_OPTION, 'stratifie'], [COLOR_EXT_OPTION, 'brut'], [PILOTIS_OPTION, 'false']];
    arr.map((item) => {
        //$('['+item[0]+'='+item[1]+']').click();
        if (isCheckbox(item[0])) {
            $('#' + item[0]).prop('checked', item[1]);
        } else {
            $('#' + item[0]).val(item[1]);
        }
        // add form value !
        $('[' + item[0] + '=' + item[1] + ']').addClass('selected');
        if (item[0] == SURFACE_OPTION) {
            setProductSurface(item[1]);
            updatePrice(item[0], item[1]);
        }
        if (item[0] == DESIGN_OPTION) {
            $('.select-nue').hasClass('selected') ? null : $('.select-nue').addClass('selected');
            $(".select-amenage").removeClass('noBorder');
        }
        $('#next-step-' + item[0]).addClass('active');

        //show images
        $("img[img-" + item[0] + "]").hide();
        $("img[img-" + item[0] + "=" + item[1] + "]").toggle();

        // Fill selected
        selectedOptions[item[0]] = item[1];
    })
}

function setProductFromUrl() {

    // URL CONDITIONNING 
    let path = document.location.pathname;
    var regJardin = new RegExp(URL_PREFIXE_JARDIN + "(\\w+)(-(\\d{1,2}))?");
    var regAvivre = new RegExp(URL_PREFIXE_AVIVRE + "(\\w+)(-(\\d{1,2}))?");
    var regEnfant = new RegExp(URL_PREFIXE_ENFANTS + "(\\w+)(-(\\d{1,2}))?");
    var regAnimaux = new RegExp(URL_PREFIXE_ANIMAUX + "(\\w+)(-(\\d{1,2}))?");

    // A - Kobe 
    $('.display-vivre').hide();
    if (path.includes('kobe')) {
        product.name = 'kobe';

    }
    // B - jardin 
    if (regJardin.test(path)) {
        product.name = path.match(regJardin)[1];
        product.type = "jardin";

        if (typeof path.match(regJardin)[3] != 'undefined') {
            product.surface = path.match(regJardin)[3];
            product.price = window["jardin_" + product.name + '_' + product.surface];
        } else {
            product.surface = '';
            product.price = {};
        }
    }
    // C A vivre
    if (regAvivre.test(path) && !path.includes('jardin')) {
        product.name = path.match(regAvivre)[1];
        product.type = "avivre";


    }
    // D - Else 
    if (regEnfant.test(path) || regAnimaux.test(path) || !path.includes('kobe') && !path.includes('jardin') && !path.includes('york') && !path.includes('grison') && !path.includes('ardenne')) {
        product.name = regEnfant.test(path) ? path.match(regEnfant)[1] : path.match(regAnimaux)[1];
        if (product.name == 'parme') {
            product.prix = { 'fixe': 5490 };
            product.type = 'enfant';
        } else if (product.name == 'paris') {
            product.prix = { 'fixe': 6900 };
            product.type = 'enfant';
        }
    }
}

// Function to product type, display or not blocks & elems
function conditionnalDisplay() {

    //by type 
    if (product.type === 'avivre') {
        $('.display-jardin').remove();
        $('.add-to-cart-2').remove();
        $('.openmodalenfant').remove();
        $('.surfaceoptionjardin').remove();
        $('#typeCabane').val(product.name);

        if (product.name === 'kobe') {
            // Case sansAmenagement_v1/B opts
            $('[design=sansAmenagement_v1]').addClass('noBorder');
            $('[design=amenagement_v1]').addClass('blackBorder');
            $("[design-old=amenage]").attr('design', 'amenagement_v1');
            $('.div-block-amenage').hide();
            $('[surface=39]').remove();
            kobeAmenagementHandle();

        } else {
            $('[surface=16]').remove();
            $('[surface=36]').remove();
            $("[design-old=nue]").attr('design', 'sansAmenagement_v1');
            $('.select-nue').addClass('noBorder');
            $('[design=sansAmenagement_v1]').addClass('blackBorder');
            $('.div-block-nue').hide();
            amenagementIlotHandle();
        }
        // Default choice brut 
        $('#color-ext').val('brut');
        $('[color-ext=brut]').addClass('selected');
        $('#next-step-color-ext').addClass('active');


    } else if (product.type === 'jardin') {
        $('.display-vivre').remove();
        $('.add-to-cart-2').remove();
        $('.openmodalenfant').remove();
        $('.surfaceoptionjardin').show();
        if (product.surface) {
            $('[surface-jardin-link=' + product.surface + ']').toggleClass('selected');
            $('.display-jardin').hide();
        }
        if (product.name == 'york') {
            //$('[surface-jardin-link=1]').hide();
            $('[surface-jardin-link=2]').hide();
            //$('[surface-jardin-link=2]').show();
        } else {
            $('[surface-jardin-link=2]').hide();
        }
    } else {

        if (product.name == 'parme' || product.name == 'paris') {
            $('.add-to-cart-2').hide();
            $('.pricemodalenfant').html(product.prix.fixe + 'â‚¬');
            $('.openmodalenfant').css('display', 'flex');
        } else {
            $('.add-to-cart-2').show();
            $('.openmodalenfant').remove();
        }
        $('.startcontactform').remove();
        $('.display-vivre').remove();
        $('.display-jardin').remove();
    }

}



// ------------------
// PRICE LOGIC 
// ------------------

function updatePrice(attrName, value) {

    // TODO Move elsewhere
    selectedOptions[attrName] = value;

    price = product.price.fixe;

    if (selectedOptions["DESIGN_SHOW_PRICE"] && selectedOptions[DESIGN_OPTION]) {
        price += parseInt(product.price[DESIGN_OPTION][selectedOptions[DESIGN_OPTION]]);
    }
    if (selectedOptions["DESIGN2_SHOW_PRICE"] && selectedOptions[DESIGN2_OPTION]) {
        price += parseInt(product.price[DESIGN2_OPTION][selectedOptions[DESIGN2_OPTION]]);
    }
    if (selectedOptions["SOL_SHOW_PRICE"] && selectedOptions[SOL_OPTION]) {
        price += parseInt(product.price[SOL_OPTION][selectedOptions[SOL_OPTION]]);
    }
    if (selectedOptions["COLOR_EXT_SHOW_PRICE"] && selectedOptions[COLOR_EXT_OPTION]) {
        if (colorArray.includes(selectedOptions[COLOR_EXT_OPTION])) {
            price += parseInt(product.price[COLOR_EXT_OPTION]['couleur']);
        } else {
            price += parseInt(product.price[COLOR_EXT_OPTION][selectedOptions[COLOR_EXT_OPTION]]);
        }
    }
    if (selectedOptions["PILOTIS_SHOW_PRICE"] && selectedOptions[PILOTIS_OPTION] && (typeof selectedOptions[PILOTIS_OPTION] != 'undefined')) {
        price += (selectedOptions[PILOTIS_OPTION] === 'true') ? parseInt(product.price[PILOTIS_OPTION]) : parseInt(0);
    }
    if (selectedOptions["MONTAGE_SHOW_PRICE"] && selectedOptions[MONTAGE_OPTION] && (typeof selectedOptions[MONTAGE_OPTION] != 'undefined')) {
        price += (selectedOptions[MONTAGE_OPTION] === 'true') ? parseInt(product.price[MONTAGE_OPTION]) : parseInt(0);
    }
    let priceString = '';
    if (price != 0) {
        priceString = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' â‚¬';
    }
    console.log(priceString);
    $('.pricerecap').html(priceString);
    $('.pricemodule').html(priceString);

}


function updateJardinPrice(attrName, value) {

    selectedOptions[attrName] = value;
    price = product.price.fixe;

    // case couleur
    let str = selectedOptions[COLOR_EXT_JARDIN_OPTION];
    let couleurPrice = (colorArray.includes(str)) ? product.price['color-ext'].couleur : product.price['color-ext'][str];
    let portePrice = (product.price.porte) ? (product.price.porte[selectedOptions[PORTE_JARDIN_OPTION]] || 0) : 0;
    let isolationPrice = (selectedOptions[ISOLATION_JARDIN_OPTION] == 'oui') ? product.price.isolation : 0;
    price += couleurPrice;

    if (selectedOptions["PORTE_JARDIN_SHOW_PRICE"]) {
        price += portePrice;
    }
    if (selectedOptions["ISOLATION_JARDIN_SHOW_PRICE"]) {
        price += isolationPrice;
    }
    if (price != 0) {
        let priceString = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' â‚¬';
        $('.pricejardin').html(priceString);
    }

}// ------- ENDPRICE -------

function selectItem(identifier, event) {
    if ($(event.currentTarget).hasClass('selected')) {
        $(event.currentTarget).removeClass('selected');
    } else {
        $(identifier + '.selected').toggleClass('selected');
        $(event.currentTarget).addClass('selected');
    }
}

function hasItemSelected(identifier) {
    return $(identifier + ".selected").length;
}
function isCheckbox(formFieldId) {
    return $('#' + formFieldId).is(':checkbox');
}

function setProductSurface(surface) {
    product.surface = surface;
    if (product.name && product.surface) {
        product.price = window[product.name + '_' + product.surface];
    }
    // case for amenagement ilot impossible for 20m2
    if (surface == '20' && product.name != 'kobe') {
        $('[design=amenagement_v1]').addClass('blackBorder');
        //$( "[design-old=amenage]" ).attr('design', 'amenage');
        $('.div-block-amenage').hide();
    } else if (product.name != 'kobe') {
        $('[design=amenagement_v1]').removeClass('blackBorder');
        //$( "[design-old=amenage]" ).removeAttr('design');
        $('.div-block-amenage').show();
    }
}

function setRecap() {
    var design = selectedOptions[DESIGN_OPTION];
    var design2 = selectedOptions[DESIGN_OPTION];
    var sol, colorExt;
    switch (selectedOptions[DESIGN_OPTION]) {
        case 'sansAmenagement_v1':
            design = "Sans amÃ©nagement Version 01"
            break;
        case 'sansAmenagement_v2':
            design = "Sans amÃ©nagement Version 02"
            break;
        case 'amenagement_v1':
            design = "AmÃ©nagement Version 01"
            break;
        case 'amenagement_v2':
            design = "AmÃ©nagement Version 02"
            break;
        default:
    }
    switch (selectedOptions[DESIGN2_OPTION]) {
        case 'base':
            design2 = "Panneaux 3 plis"
            break;
        case 'blanchi':
            design2 = "Bardage B/T"
            break;
        case 'luxe':
            design2 = "Bardage chÃªne"
            break;
        default:
    }
    switch (selectedOptions[SOL_OPTION]) {
        case 'parquet':
            sol = "Parquet contrecollÃ©"
            break;
        case 'stratifie':
            sol = "StratifiÃ©"
            break;
        default:
    }
    switch (selectedOptions[COLOR_EXT_OPTION]) {
        case 'brut':
            colorExt = "Bois brut"
            break;
        case 'noir':
            colorExt = "Noir RAL 7021"
            break;
        case 'gris':
            colorExt = "Gris foncÃ© RAL 7016"
            break;
        case 'bleu':
            colorExt = "Bleu RAL 5013"
            break;
        case 'vert':
            colorExt = "Vert RAL 6005"
            break;
        case 'brule':
            colorExt = "Bois brÃ»lÃ©"
            break;
        default:
    }

    $('#' + SURFACE_OPTION + '-recap').html(selectedOptions[SURFACE_OPTION] + "mÂ²");
    $('#' + DESIGN_OPTION + '-recap').html(design);
    $('#' + DESIGN2_OPTION + '-recap').html(design2);
    $('#' + SOL_OPTION + '-recap').html(sol);
    $('#' + COLOR_EXT_OPTION + '-recap').html(colorExt);
    $('#' + PILOTIS_OPTION + '-recap').html(selectedOptions[PILOTIS_OPTION] == 'true' ? 'oui' : 'non');
    $('#' + MONTAGE_OPTION + '-recap').html(selectedOptions[MONTAGE_OPTION] == 'true' ? 'oui' : 'non');

}

// ------------------
// LISTENERS GENERIC 
// ------------------
// identifier : jquery query for all divs that can be selected
function addStepListener(identifier, attrName, formFieldId) {

    $(identifier).click(function (event) {
        let value = event.currentTarget.getAttribute(attrName);

        selectItem(identifier, event);
        if (attrName == SURFACE_OPTION) {
            setProductSurface(value);
        }

        if (hasItemSelected(identifier)) {
            if (isCheckbox(formFieldId)) {
                let checkboxValue = $('#' + formFieldId).prop('checked');
                $('#' + formFieldId).prop('checked', ((value == 'oui') && !checkboxValue));
            } else {
                $('#' + formFieldId).val(value);
                selectedOptions[attrName] = value;
            }
            $("#next-step-" + formFieldId).addClass('active');
        } else {
            if (isCheckbox(formFieldId)) {
                event.currentTarget.setAttribute('isPristine', false);
                $('#' + formFieldId).prop('checked', false);
            } else {
                $('#' + formFieldId).val('');
                selectedOptions[attrName] = '';
            }
            $("#next-step-" + formFieldId).removeClass('active');
        }

        // show thumb 
        // case surface

        //case amenagement
        if (attrName == DESIGN_OPTION) {
            $("img[img-" + attrName + "]").hide();
            $("img[img-" + attrName + "=" + product.surface + '_' + value + "]").toggle();
        } else if (attrName == SURFACE_OPTION && selectedOptions[attrName]) {
            if (product.surface == '20' && selectedOptions[DESIGN_OPTION] == 'amenagement_v2') {
                $('[design=amenagement_v1]').click();
            }
            $("img[img-" + DESIGN_OPTION + "]").hide();
            $("img[img-" + DESIGN_OPTION + "=" + product.surface + '_' + selectedOptions[DESIGN_OPTION] + "]").toggle();
            $("img[img-" + attrName + "]").hide();
            $("img[img-" + attrName + "=" + value + "]").toggle();
        } else {
            $("img[img-" + attrName + "]").hide();
            $("img[img-" + attrName + "=" + value + "]").toggle();
        }


        updatePrice(attrName, value);
    });
}

function addStepListenerJardin(identifier, selectId, valueName) {
    $('[' + identifier + ']').click(function (e) {
        selectItem('div[' + identifier + ']', e);

        values[valueName] = e.currentTarget.getAttribute('value');
        selectedOptions[identifier] = $(this).attr(identifier);
        if ($(e.currentTarget).hasClass('selected')) {
            $('.addtocard-jardin #' + selectId).val(values[valueName]).trigger('change');
            updateAll(selectId);
        } else {
            setTimeout(() => {
                $('.addtocard-jardin #' + selectId).val('');
                values[valueName] = '';
                selectedOptions[identifier] = '';
                updateAll(selectId);
            }, 50);
        }

        setTimeout(() => {
            (selectOptionPorteJardinId != '') ? $('.addtocard-jardin #' + selectOptionPorteJardinId).val(values.porteValue) : null;
            (selectOptionIsolationJardinId != '') ? $('.addtocard-jardin #' + selectOptionIsolationJardinId).val(values.isoValue) : null;
        }, 50);
        if (hasItemSelected('div[' + identifier + ']')) {
            $("#next-step-" + identifier).addClass('active');
        } else {
            $("#next-step-" + identifier).removeClass('active');
        }
        $("img[img-" + identifier + "]").hide();
        $("img[img-" + identifier + "=" + event.currentTarget.getAttribute(identifier) + "]").toggle();
        updateJardinPrice(identifier, selectedOptions[identifier]);
    });
}

function nextListener(identifier) {
    $('#next-step-' + identifier).click(function (e) {
        e.preventDefault();
        if ($('#' + identifier).val() != '' && (typeof $('#' + identifier).val() !== 'undefined')) {
            $('#next-step').click();
            if (identifier == SURFACE_OPTION) {
                selectedOptions.DESIGN_SHOW_PRICE = true;
            } else if (identifier == DESIGN_OPTION) {
                selectedOptions.DESIGN2_SHOW_PRICE = true;
            } else if (identifier == DESIGN2_OPTION) {
                selectedOptions.SOL_SHOW_PRICE = true;
            } else if (identifier == SOL_OPTION) {
                selectedOptions.COLOR_EXT_SHOW_PRICE = true;
            } else if (identifier == COLOR_EXT_OPTION) {
                selectedOptions.PILOTIS_SHOW_PRICE = true;
            }
        }
    });
}

function nextListenerCheckbox(identifier) {
    $('#next-step-' + identifier).click(function (e) {
        e.preventDefault();
        if (identifier == PILOTIS_OPTION) {
            selectedOptions.MONTAGE_SHOW_PRICE = false;
            //updatePrice(MONTAGE_OPTION, "true");
            $('[montage=false]').click();
            //selectedOptions[MONTAGE_OPTION]=true;
        } else if (identifier == MONTAGE_OPTION) {
            setRecap();
        }
        if ($("div[" + identifier + "].selected").length) {
            $('#next-step').click();
        }
    });
}




$(document).ready(function () {

    setProductFromUrl();

    conditionnalDisplay();
    if (product.type == 'avivre') {
        init();
    }


    $('div[productoption]').each(function (i) {
        let label = $(this).find('label');
        let select = $(this).find('select');
        let options = $(this).find('option[value]');
        let selectId = select.attr('id');

        // html() = product option label in webflow
        if (label.html() == 'Couleur ExtÃ©rieure') {
            selectOptionColorExtJardinId = selectId;
            setValueToSelectBlock(COLOR_EXT_JARDIN_OPTION, options);
        } else if (label.html() == 'Porte') {
            selectOptionPorteJardinId = selectId;
            setValueToSelectBlock(PORTE_JARDIN_OPTION, options);
        } else if (label.html() == 'Isolation') {
            selectOptionIsolationJardinId = selectId;
            setValueToSelectBlock(ISOLATION_JARDIN_OPTION, options);
        }
    });

    $('[dynamicselect]').change(function (event) {
        console.log("hey " + $(this).val());
        let idSelect = $(this).attr('data-commerce-option-set-id');
        let idOption = $(this).val();
        console.log('select : ' + idSelect + ' idOption ' + idOption);
        $('[data-commerce-option-set-id=' + $(this).attr('data-commerce-option-set-id') + ']').val($(this).val());
    });

    $('.startcontactform').click(function (e) {
        if (product.type === "avivre") {
            $('.display-vivre').show();
            $('#wf-form-a-vivre-commande').show();
            $("html, body").animate({ scrollTop: $('.display-vivre').offset().top - 80 }, 300);
        } else if (product.type == "jardin" && product.surface != '') {
            $('.module-jardin').show();
            $('.display-jardin').css('display', 'flex');
            $('html,body').animate({
                scrollTop: $('.section-jardin').offset().top - 60
            }, 300);
        } else {
            $('.text-block-33').css("color", "red");
        }
    });




    // ---------------
    // FORM JARDIN 
    // ---------------

    if (product.type == "jardin") {
        addStepListenerJardin(COLOR_EXT_JARDIN_OPTION, selectOptionColorExtJardinId, 'colorValue');
        addStepListenerJardin(PORTE_JARDIN_OPTION, selectOptionPorteJardinId, 'porteValue');
        addStepListenerJardin(ISOLATION_JARDIN_OPTION, selectOptionIsolationJardinId, 'isoValue');

        //Step 1
        $('#next-step-' + COLOR_EXT_JARDIN_OPTION).click(function (e) {
            e.preventDefault();
            if (selectOptionColorExtJardinId != '' && $('#' + selectOptionColorExtJardinId).val() != '' && (typeof $('#' + selectOptionColorExtJardinId).val() !== 'undefined')) {
                selectedOptions.PORTE_JARDIN_SHOW_PRICE = true;
                $('#next-step-jardin').click();
            }
        });
        //Step 2
        $('#next-step-' + PORTE_JARDIN_OPTION).click(function (e) {
            e.preventDefault();
            if (selectOptionPorteJardinId != '' && $('#' + selectOptionPorteJardinId).val() != '' && (typeof $('#' + selectOptionPorteJardinId).val() !== 'undefined')) {
                selectedOptions.ISOLATION_JARDIN_SHOW_PRICE = true;
                $('#next-step-jardin').click();
            }
        });

        // defaut choices
        if (product.surface) {
            values.colorValue = $('[color-ext-jardin=brut]').attr('value');
            $('#' + selectOptionColorExtJardinId).val(values.colorValue);
            updateAll(selectOptionColorExtJardinId);
            //updateJardinPrice(PORTE_JARDIN_OPTION, 'signature');
            $('div[color-ext-jardin=brut]').addClass('selected');
            $('#next-step-color-ext-jardin').addClass('active');
            $("img[img-color-ext-jardin]").hide();
            $("img[img-color-ext-jardin=brut]").toggle();
            updateJardinPrice('color-ext-jardin', 'brut');

            setTimeout(function () {
                values.porteValue = $('[porte-jardin=sans-hublot]').attr('value');
                $('#' + selectOptionPorteJardinId).val(values.porteValue);
                updateAll(selectOptionPorteJardinId);
                $("img[img-color-ext-jardin]").hide();
                $("img[img-color-ext-jardin=brut]").toggle();
                $('div[porte-jardin=sans-hublot]').addClass('selected');
                $('#next-step-porte-jardin').addClass('active');
            }, 200);

            setTimeout(function () {
                values.isoValue = $('[isolation-jardin=non]').attr('value');
                $('#' + selectOptionIsolationJardinId).val(values.isoValue);
                updateAll(selectOptionIsolationJardinId);
                $("img[img-isolation-jardin]").hide();
                $("img[img-isolation-jardin=non]").toggle();
                $('div[isolation-jardin=non]').addClass('selected');
                $('#next-step-isolation-jardin').addClass('active');
            }, 400);
        }

        // Step 3
        $('.openmodal').click(function (e) {
            if ($('#' + selectOptionIsolationJardinId).val() && !$(event.currentTarget).hasClass('clicked')) {
                $('.modalmask').css('display', 'flex');
                $('.showmodal').css('display', 'flex');
            }
        });
        $('.closemodal').click(function (e) {
            $('.modalmask').css('display', 'none');
            $('.showmodal').css('display', 'none');
        });

        // Add to cart 
        $('.addtocartcustom').not('.clicked').click(function (e) {
            if ($('#' + selectOptionIsolationJardinId).val() && !$(event.currentTarget).hasClass('clicked')) {
                $('.addtocartcustom .text-block-20').html('...');
                $('#submitjardin').click();
                $('.addtocartcustom .text-block-20').html('AjoutÃ©e');
                $('.addtocartcustom').addClass('clicked');
                $('.modal').css('display', 'none');
                $('.openmodal').html('AjoutÃ©e');
                $('.openmodal').addClass('clicked');
                $('.modalmask').css('display', 'none');
                $('.showmodal').css('display', 'none');
            }
        })
        // Back btn 
        $('.step-btn-before-jardin').not('.firststepreturn').click(function (e) {
            e.preventDefault();
            $('#previous-step-jardin').click();
        });
    }

    // Surface choice in jardin
    $('[surface-jardin-link]').click(function (e) {
        //let pathWithProductName = window.location.pathname.match('(jardin-){1}\\w+')[0];
        if (product.name != '') {
            window.location.href = window.location.protocol + "//" + window.location.host + "/product/jardin-" + product.name + '-' + $(this).attr('surface-jardin-link');
        }
    });

    // ---------------
    // FORM AVIVRE
    // ---------------

    // Step1
    addStepListener("div[" + SURFACE_OPTION + "]", SURFACE_OPTION, SURFACE_OPTION);
    nextListener(SURFACE_OPTION);

    //Step 2
    addStepListener("div[design]", DESIGN_OPTION, DESIGN_OPTION);
    nextListener(DESIGN_OPTION);

    //Step 3
    addStepListener("div[design2]", DESIGN2_OPTION, DESIGN2_OPTION);
    nextListener(DESIGN2_OPTION);

    //Step 4
    addStepListener("div[sol]", SOL_OPTION, SOL_OPTION);
    nextListener(SOL_OPTION);

    //Step 5
    addStepListener("div[color-ext]", COLOR_EXT_OPTION, COLOR_EXT_OPTION);
    nextListener(COLOR_EXT_OPTION);

    //Step 6
    nextListenerCheckbox(PILOTIS_OPTION);
    addStepListener("div[pilotis]", PILOTIS_OPTION, PILOTIS_OPTION);

    //Step 7
    nextListenerCheckbox(MONTAGE_OPTION);
    addStepListener("div[montage]", MONTAGE_OPTION, MONTAGE_OPTION);


    // Return btn
    $('.step-btn-before').not('.firststepreturn').click(function (e) {
        e.preventDefault();
        $('.previousstep').click();
    });



    // STEPPER prevent it to be clickable
    $('.stepper-module .w-slider-dot').click(function (e) {
        e.stopPropagation();
    });


    // -------------------
    // ENFANTS 
    // -------------------
    $('.openmodalenfant').click(function (e) {
        if (!$(event.currentTarget).hasClass('clicked')) {
            $('.modalmask').css('display', 'flex');
            $('.showmodalenfant').css('display', 'flex');
        }
    });
    $('.closemodalenfant').click(function (e) {
        $('.modalmask').css('display', 'none');
        $('.showmodalenfant').css('display', 'none');
    });
    // Add to cart 
    $('.addtocartcustomenfant').not('.clicked').click(function (e) {
        $('.addtocartcustomenfant .text-block-20').html('...');
        $('.add-to-cart-2 input[type=submit]').click();
        $('.addtocartcustomenfant .text-block-20').html('AjoutÃ©e');
        $('.addtocartcustomenfant').addClass('clicked');
        $('.modal').css('display', 'none');
        $('.openmodalenfant').html('AjoutÃ©e');
        $('.openmodalenfant').addClass('clicked');
        $('.modalmask').css('display', 'none');
        $('.showmodalenfant').css('display', 'none');
    })

});
