import {isArray} from "@material-ui/data-grid";

const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function saveLocalData(objName, data) {
    localStorage.setItem(objName, JSON.stringify(data));
}

function getLocalData(objName) {
    return JSON.parse(localStorage.getItem(objName));
}

function removeLocalData(objName) {
    localStorage.removeItem(objName);
}

function userLoggedIn() {
    if (getLocalData("is_admin") === false) {
        alert('Un-Authorized access!');
        window.location.href = window.location.protocol + "//" + window.location.host;
        return false;
    }

    return true;
}

function showLoader() {
    document.getElementById("page-loader-switch").style.display = "block";
}

function hideLoader() {
    document.getElementById("page-loader-switch").style.display = "none";
}

function easyEncode(str) {
    return window.btoa(str);
}

function easyDecode(str) {
    return window.atob(str);
}

function loadData(string) {
    return JSON.parse(easyDecode(string))
}

function getSyllabusNameById(syllabus_id) {
    if(!syllabus_id)
        return null;

    // get all types
    let syllabus_types = $helper.getLocalData('syllabus_types');
    if(!syllabus_types)
        return null;

    // if not null, filter by ID in url,
    syllabus_types = syllabus_types.filter((type) => {
        return type.id == easyDecode(syllabus_id)
    });

    // if this returns a value, update page_title state
    if (syllabus_types.length > 0) {
        return ' ' + syllabus_types[0].name;
    }

    return null;
}

function getClassNameById(class_id) {
    if(!class_id)
        return null;

    // get all types
    let classes = $helper.getLocalData('all_classes');
    if(!classes)
        return null;

    // if not null, filter by ID in url,
    classes = classes.filter((c) => {
        return c.id == easyDecode(class_id)
    });

    // if this returns a value, update page_title state
    if (classes.length > 0) {
        return ' ' + classes[0].name;
    }

    return null;
}

function getClassNameBySyllabusId(syllabus_type_id, class_id) {
    if(!syllabus_type_id && !class_id)
        return null;

    // get all types
    let classes = $helper.getLocalData(`classes_stid_${syllabus_type_id}`);
    if(!classes)
        return null;

    // if not null, filter by ID in url,
    classes = classes.filter((c) => {
        return c.id == easyDecode(class_id)
    });

    // if this returns a value, update page_title state
    if (classes.length > 0) {
        return ' ' + classes[0].name;
    }

    return null;
}

function getSubjectNameById(class_id, subject_id, syllabus_type_id) {
    if(!subject_id || !class_id)
        return null;

    // get all types
    let subjects = $helper.getLocalData(`subjects_${class_id}_${syllabus_type_id}`);
    if(!subjects)
        return null;

    // if not null, filter by ID in url,
    subjects = subjects.filter((c) => {
        return c.id == easyDecode(subject_id)
    });

    // if this returns a value, update page_title state
    if (subjects.length > 0) {
        return ' ' + subjects[0].name;
    }

    return null;
}

function buildPaperUrlWithParams(endpoint, params) {
    let url = 'dashboard';
    if(!endpoint)
        return url;

    if(typeof params !== 'object')
        return endpoint;

    const built_params = buildQueryParams(params);
    return `/${REACT_V1_PAPER_ROUTES_PREFIX}/${endpoint}?${built_params}`
}


function buildUrlWithParams(endpoint, params) {
    let url = 'dashboard';
    if(!endpoint)
        return url;

    if(typeof params !== 'object')
        return endpoint;

    const built_params = buildQueryParams(params);
    return `/${REACT_V1_ROUTES_PREFIX}/${endpoint}?${built_params}`
}

function buildQueryParams(params) {
    if(typeof params !== 'object')
        return '';

    let built_params =  '';
    for (const [key, value] of Object.entries(params)) {
        built_params += `${key}=${value}&`;
    }
    // remove last "&" from the string
    built_params = built_params.substr(0, built_params.length - 1);

    return built_params;
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function getSubjectCode(class_id, subject_id, syllabus_type_id) {
    let subject_code = '';
    let subjects = getLocalData(`subjects_${class_id}_${syllabus_type_id}`);
    let classes = getLocalData(`classes_stid_${syllabus_type_id}`);
    if(!subjects && !classes) {
        return null;
    }

    subjects = subjects.filter((s) => {
        return s.id == easyDecode(subject_id);
    });

    classes = classes.filter((c) => {
       return c.id == easyDecode(class_id);
    });

    // if this returns a value, update page_title state
    if (subjects.length > 0) {
        subject_code = subjects[0].code;
    }

    if (classes.length > 0) {
        subject_code += '-00' +classes[0].level;
    }

    return subject_code;
}

function getSectionById(syllabus_type_id, class_id, subject_id, section_id) {
    let sections = $helper.getLocalData(`section_${class_id}_${subject_id}_${syllabus_type_id}`);

    if(!sections) {
        return null;
    }

    if(!isArray(sections)) {
        sections.i = 1;
        return sections;
    }

    sections = sections.filter((s, i) => {
        if(s.id == easyDecode(section_id)) {
            s.i = i+1;
            return s;
        }
    });

    if (sections.length > 0) {
        return sections[0];
    }


    return null;
}

function getSectionName(syllabus_type_id, class_id, subject_id, section_id) {

    let s = getSectionById(syllabus_type_id, class_id, subject_id, section_id);
    let title = null;
    if (s) {
        const name = s.name.length > 0 ? s.name : s.rtl_name;
        title = `${s.parent_title}-${s.i}: ${name}`
    }
    return title;
}

function getTopicName(syllabus_type_id, class_id, subject_id, section_id, topic_id) {

    let s = getSectionById(syllabus_type_id, class_id, subject_id, section_id);
    let title = null;
    if (s) {
        const name = s.name.length > 0 ? s.name : s.rtl_name;
        title = `${s.parent_title}-${s.i}: ${name}`;

        let topics = s.topics.filter((t, i) => {
            if(t.id == easyDecode(topic_id)) {
                t.i = i+1;
                return t;
            }
        });

        if(topics.length > 0) {
            let t = topics[0];
            title += ` (${s.i}.${pad(t.i, 2)}: ${t.name.length > 0 ? t.name : t.rtl_name})`;
        }
    }

    return title;
}

function getAlphabet(index) {
    return alphabets[index];
}

function getImageBasePath() {
    return APP_URL + '/';
}

function generateListItemUrl(item, step, publisher, clas, subject, section) {
    let url = '/';
    switch (step) {
        case 1:
            url = buildUrlWithParams('classes', {stid: easyEncode(item)});
            break;
        case 2:
            url = buildUrlWithParams('subjects', {stid: publisher, cid: easyEncode(item)});
            break;
        case 3:
            url = buildUrlWithParams('sections', {
                stid: publisher,
                cid: clas,
                suid: subject,
            });
            break;
        case 5:
            url = buildUrlWithParams('questions', {
                stid: publisher,
                cid: clas,
                suid: subject,
                seid: section,
                tid: easyEncode(item)
            });
            break;
    }
    return url;
}

function checkUTF8(text) {
    try {
        // Try to convert to utf-8
        let utf8Text = decodeURIComponent(escape(text));
        return false;
    } catch(e) {
        return true;
    }
}

function triggerLeftPaneCollapse() {
    $('.profile-col').addClass('collapsed');
    $('.dasboard-col').addClass('collapsed');
}

function getSlug(string) {
    return string.replace(' ', '-')
}

export {
    getParameterByName,
    saveLocalData,
    getLocalData,
    removeLocalData,
    userLoggedIn,
    showLoader,
    hideLoader,
    easyEncode,
    easyDecode,
    getSyllabusNameById,
    getClassNameById,
    getClassNameBySyllabusId,
    getSubjectNameById,
    buildQueryParams,
    buildUrlWithParams,
    pad,
    getSubjectCode,
    getSectionById,
    getSectionName,
    getTopicName,
    getAlphabet,
    getImageBasePath,
    generateListItemUrl,
    buildPaperUrlWithParams,
    checkUTF8,
    triggerLeftPaneCollapse,
    loadData
}
