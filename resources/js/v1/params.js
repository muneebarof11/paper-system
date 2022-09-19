import MCQ from "./Questions/components/general/listing/MCQ";
import GeneralQuestion from "./Questions/components/general/listing/GeneralQuestion";
import MatchColumn from "./Questions/components/general/listing/MatchColumn";
import ImageQuestion from "./Questions/components/general/listing/ImageQuestion";
import RTLMCQ from "./Questions/components/urdu/listing/RTLMCQ";
import RTLGeneralQuestion from "./Questions/components/urdu/listing/RTLGeneralQuestion";
import IslMCQ from "./Questions/components/islamiyat/listing/IslMCQ";
import IslGeneralQuestion from "./Questions/components/islamiyat/listing/IslGeneralQuestion";
import EngMCQ from "./Questions/components/english/listing/EngMCQ";
import EngGeneralQuestion from "./Questions/components/english/listing/EngGeneralQuestion";
import RTLMatchColumn from "./Questions/components/urdu/listing/RTLMatchColumn";
import MathGeneralQuestion from "./Questions/components/math/listing/MathGeneralQuestion";
import MathMCQ from "./Questions/components/math/listing/MathMCQ";
import MathMatchColumn from "./Questions/components/math/listing/MathMatchColumn";

export const class_id = $helper.getParameterByName('cid');
export const syllabus_type_id = $helper.getParameterByName('stid');
export const subject_id = $helper.getParameterByName('suid');
export const section_id = $helper.getParameterByName('seid');
export const topic_id = $helper.getParameterByName('tid');

export const math_components = {
    mcq: MathMCQ,
    general: MathGeneralQuestion,
    true_false: MathGeneralQuestion,
    columns: MathMatchColumn,
    banks: GeneralQuestion,
};

export const general_components = {
    mcq: MCQ,
    general: GeneralQuestion,
    true_false: GeneralQuestion,
    banks: GeneralQuestion,
    columns: MatchColumn,
    image: ImageQuestion,
};

export const isl_components = {
    mcq: RTLMCQ,
    general: IslGeneralQuestion,
    true_false: GeneralQuestion,
    banks: GeneralQuestion,
    columns: MatchColumn,

};

export const urdu_components = {
    mcq: RTLMCQ,
    true_false: RTLGeneralQuestion,
    general: RTLGeneralQuestion,
    columns: RTLMatchColumn,
    banks: GeneralQuestion,
};

export const eng_components = {
    mcq: EngMCQ,
    true_false: EngGeneralQuestion,
    general: EngGeneralQuestion,
    columns: MatchColumn,
    banks: EngGeneralQuestion,
};

export const special_subjects = [
  'urd',
  'isl',
  'eng'
];

export const ckEditor_config = {
    toolbar: {
        items: [
            'heading', 'MathType', 'ChemType',
            '|',
            'bold',
            'italic',
            'bulletedList',
            'numberedList',
            'insertTable',
            'blockQuote',
            'undo',
            'redo',
            'PasteFromOffice'
        ]
    },
    extraPlugins: ['PasteFromOffice'],
    language: 'en',
    height: '700px'
};

export const ckEditor_rtl_config = {
    ...ckEditor_config,
    language: 'ar',
    direction: 'rtl',
};
