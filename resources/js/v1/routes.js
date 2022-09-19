import React, { lazy } from 'react';
import {Route} from 'react-router-dom';

const UnderConstruction = lazy(() => import('./UnderConstruction'));
const PreDefined = lazy(() => import('./pre-defined-papers/components/index'));

const routes_v1 = [

    /**
     * routes for syllabus entries
     * its prefix is "School"
     */
    // <Route exact path={`/${REACT_V1_ROUTES_PREFIX}`} component={Publishers} key="root" />,
    // <Route exact path={`/${REACT_V1_ROUTES_PREFIX}/publisher/`} component={Publishers} key="publishers" />,
    // <Route exact path={`/${REACT_V1_ROUTES_PREFIX}/classes/`} component={Classes} key="classes" />,
    // <Route exact path={`/${REACT_V1_ROUTES_PREFIX}/subjects/`} component={Subjects} key="subjects" />,
    // <Route exact path={`/${REACT_V1_ROUTES_PREFIX}/sections/`} component={Sections} key="sections" />,
    // <Route exact path={`/${REACT_V1_ROUTES_PREFIX}/questions/`} component={Questions} key="questions" />,
    // <Route exact path={`/${REACT_V1_ROUTES_PREFIX}/import-questions/`} component={DataImport} key="import_questions" />,

    /**
     * routes for paper generation.
     * its prefix is "Papers"
     */
    // <Route exact path={`/${REACT_V1_PAPER_ROUTES_PREFIX}`} component={PPublishers} key="paper-root" />,
    // <Route exact path={`/${REACT_V1_PAPER_ROUTES_PREFIX}/create-paper`} component={PPublishers} key="paper-publisher" />,
    // <Route exact path={`/${REACT_V1_PAPER_ROUTES_PREFIX}/classes`} component={PClasses} key="paper-classes" />,
    // <Route exact path={`/${REACT_V1_PAPER_ROUTES_PREFIX}/subjects`} component={PSubjects} key="paper-subjects" />,
    // <Route exact path={`/${REACT_V1_PAPER_ROUTES_PREFIX}/sections`} component={PSections} key="paper-sections" />,
    // <Route exact path={`/${REACT_V1_PAPER_ROUTES_PREFIX}/questions`} component={PQuestions} key="paper-questions" />,
    // <Route exact path={`/${REACT_V1_PAPER_ROUTES_PREFIX}/preview`} component={PaperPreview} key="paper-preview" />,

    /**
     * Other Routes
     */
    // saved papers
    // <Route exact path={`/saved-papers`} component={SavedPapers} key="save-paper" />,
    // past papers
    <Route exact path={`/${REACT_V1_PAPER_ROUTES_PREFIX}/past-papers`} component={UnderConstruction} />,
    // pre-defined
    <Route exact path={`/previous-papers`} component={PreDefined} key="pre-defined" />,
];

export default routes_v1;
