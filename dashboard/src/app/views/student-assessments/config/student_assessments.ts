export const config = {
    filters: [
        {
            "label": "LO Summary",
            "name": "Academic Year",
            "id": "academicYear",
            "labelProp": "academicyear",
            "valueProp": "academicyear_id",
            "query": "select academicyear_id, academicyear from dimensions.academicyear order by academicyear_id asc"
        },
        // {
        //     "label": "LO Summary",
        //     "name": "Exam Event Grade",
        //     "id": "exam_id",
        //     "labelProp": "exam_name",
        //     "valueProp": "exam_id",
        //     "query": "select exam_id, exam_name from dimensions.exam"
        // },
        {
            "label": "LO Summary",
            "name": "Grade",
            "id": "grade",
            "labelProp": "grade",
            "valueProp": "grade",
            "query": "select grade from dimensions.grade"
        },
        {
            "label": "LO Summary",
            "name": "Subject",
            "id": "subject_id",
            "labelProp": "subject",
            "valueProp": "subject",
            "query": "select subject from dimensions.subject"
        },
        {
            "label": "Map View",
            "name": "Academic Year",
            "id": "academicYear",
            "labelProp": "academicyear",
            "valueProp": "academicyear_id",
            "query": "select academicyear_id, academicyear from dimensions.academicyear"
        },
        // {
        //     "label": "Map View",
        //     "name": "Exam Event Grade",
        //     "id": "exam",
        //     "labelProp": "exam_name",
        //     "valueProp": "exam_id",
        //     "query": "select exam_id,exam_name from dimensions.exam"
        // },
        {
            "label": "Map View",
            "name": "Grade",
            "id": "grade",
            "labelProp": "grade",
            "valueProp": "grade_id",
            "query": "select grade_id,grade from dimensions.grade"
        },
        {
            "label": "Map View",
            "name": "Subject",
            "id": "subject",
            "labelProp": "subject",
            "valueProp": "subject_id",
            "query": "select subject_id,subject from dimensions.subject order by subject asc"
        },


        {
            "label": "Assessment Summary",
            "name": "Academic Year",
            "id": "academicYear",
            "labelProp": "academicyear",
            "valueProp": "academicyear_id",
            "query": "select academicyear_id, academicyear from dimensions.academicyear order by academicyear_id asc"
        },
        // {
        //     "label": "Assessment Summary",
        //     "name": "Exam Event Grade",
        //     "id": "exam_id",
        //     "labelProp": "exam_name",
        //     "valueProp": "exam_id",
        //     "query": "select exam_id,exam_name from dimensions.exam"
        // },
        {
            "label": "Assessment Summary",
            "name": "Grade",
            "id": "grade_id",
            "labelProp": "grade",
            "valueProp": "grade_id",
            "query": "select grade_id,grade from dimensions.grade"
        },
        {
            "label": "Assessment Summary",
            "name": "Subject",
            "id": "subject_id",
            "labelProp": "subject",
            "valueProp": "subject_id",
            "query": "select subject_id,subject from dimensions.subject"
        },
    ],
    avg_student_assessment_bignumber: {
        "label": "Assessment Summary",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber": "SELECT ceil(COALESCE(CAST(AVG(obtained_marks/total_marks)*100 AS numeric(10,2)), 0)) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.grade_id, obtained_marks.exam_id, obtained_marks.academicyear_id, obtained_marks.subject_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id) AS student_assessment"
                    },
                    "level": "district"
                }
            },
            {
                "name": "District",
                "labelProp": "district_name",
                "valueProp": "district_id",
                "hierarchyLevel": "2",

                "actions": {
                    "queries": {
                        "bigNumber": "SELECT ceil(COALESCE(CAST(AVG(obtained_marks/total_marks)*100 AS numeric(10,2)), 0)) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.grade_id, obtained_marks.exam_id, obtained_marks.academicyear_id, obtained_marks.subject_id, district.district_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.district AS district ON district.district_id = school.district_id) AS student_assessment WHERE district_id = {district_id};"

                    },
                    "level": "block"
                }
            },
            {
                "name": "Block",
                "labelProp": "block_name",
                "valueProp": "block_id",
                "hierarchyLevel": "3",
                "actions": {
                    "queries": {
                        "bigNumber": "SELECT ceil(COALESCE(CAST(AVG(obtained_marks/total_marks)*100 AS numeric(10,2)), 0)) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.grade_id, obtained_marks.exam_id, obtained_marks.academicyear_id, obtained_marks.subject_id, block.block_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.block AS block ON block.block_id = school.block_id) AS student_assessment WHERE block_id = {block_id};"
                    },
                    "level": "cluster"
                }
            },
            {
                "name": "Cluster",
                "labelProp": "cluster_name",
                "valueProp": "cluster_id",
                "hierarchyLevel": "4",
                "actions": {
                    "queries": {
                        "bigNumber": "SELECT ceil(COALESCE(CAST(AVG(obtained_marks/total_marks)*100 AS numeric(10,2)), 0)) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.grade_id, obtained_marks.exam_id, obtained_marks.academicyear_id, obtained_marks.subject_id, cluster.cluster_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.cluster AS cluster ON cluster.cluster_id = school.cluster_id) AS student_assessment WHERE cluster_id = {cluster_id};"
                    },
                    "level": "school"
                }
            },
            {
                "name": "School",
                "labelProp": "school_name",
                "valueProp": "school_id",
                "hierarchyLevel": "5",
                "actions": {
                    "queries": {
                        "bigNumber": "SELECT ceil(COALESCE(CAST(AVG(obtained_marks/total_marks)*100 AS numeric(10,2)), 0)) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.grade_id, obtained_marks.exam_id, obtained_marks.academicyear_id, obtained_marks.subject_id, school.school_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id) AS student_assessment WHERE school_id = {school_id};"
                    },
                    "level": "school"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": "Average Student Assessment Scores",
                "valueSuffix": '%',
                "property": 'average',
            }
        }
    },

    average_student_assessment_score_table: {
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "table":"SELECT district_name AS district,grade,subject, CAST(AVG(obtained_marks/total_marks)*100 AS numeric(10,2)) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.school_id AS school_id, obtained_marks.grade_id, obtained_marks.academicyear_id, obtained_marks.subject_id, grade.grade, subject.subject, district.district_name, obtained_marks.exam_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.district AS district ON district.district_id = school.district_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id) AS student_assessment GROUP BY district_name,grade,subject; "
                    },
                    "level": "district"
                }
            },
            {
                "name": "District",
                "labelProp": "district_name",
                "valueProp": "district_id",
                "hierarchyLevel": "2",
                "actions": {
                    "queries": {
                        "table":"SELECT block_name AS block,grade,subject,district_id ,CAST(AVG(obtained_marks/total_marks)*100 AS numeric(10,2)) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.school_id AS school_id, obtained_marks.grade_id, obtained_marks.academicyear_id, obtained_marks.subject_id, grade.grade, subject.subject, block.block_name, obtained_marks.exam_id, block.block_id, district.district_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.block AS block ON block.block_id = school.block_id INNER JOIN dimensions.district AS district ON district.district_id = school.district_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id) AS student_assessment where district_id={district_id} GROUP BY block_name,grade,subject,district_id;"
                    },
                    "level": "block"
                }
            },
            {
                "name": "Block",
                "labelProp": "block_name",
                "valueProp": "block_id",
                "hierarchyLevel": "3",
                "actions": {
                    "queries": {
                        "table":"SELECT cluster_name AS cluster,grade,subject,block_id, CAST(AVG(obtained_marks/total_marks)*100 AS numeric(10,2)) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.school_id AS school_id, obtained_marks.grade_id, obtained_marks.academicyear_id, obtained_marks.subject_id, obtained_marks.exam_id, grade.grade, subject.subject, cluster.cluster_name, cluster.cluster_id, block.block_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.block AS block ON block.block_id = school.block_id INNER JOIN dimensions.cluster AS cluster ON cluster.cluster_id = school.cluster_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id) AS student_assessment where block_id={block_id} GROUP BY cluster_name,grade,subject,block_id;"
                    },
                    "level": "cluster"
                }
            },
            {
                "name": "Cluster",
                "labelProp": "cluster_name",
                "valueProp": "cluster_id",
                "hierarchyLevel": "4",
                "actions": {
                    "queries": {
                        "table": "SELECT school_name AS school,grade,subject,cluster_id, CAST(AVG(obtained_marks/total_marks)*100 AS numeric(10,2)) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.school_id AS school_id, obtained_marks.grade_id, obtained_marks.academicyear_id, obtained_marks.subject_id, obtained_marks.exam_id, grade.grade, subject.subject, school.school_name, cluster.cluster_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.cluster AS cluster ON cluster.cluster_id = school.cluster_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id) AS student_assessment WHERE cluster_id={cluster_id} GROUP BY school_name,grade,subject,cluster_id;"
                    },
                    "level": "school"
                }
            },
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "District",
                        property: "district",
                        class: "text-center"
                    },
                    {
                        name: "Block",
                        property: "block",
                        class: "text-center"
                    },
                    {
                        name: "Cluster",
                        property: "cluster",
                        class: "text-center"
                    },
                    ,
                    {
                        name: "School",
                        property: "school",
                        class: "text-center"
                    },
                    {
                        name: "Grade",
                        property: "grade",
                        class: "text-center"
                    },
                    {
                        name: "Subject",
                        property: "subject",
                        class: "text-center"
                    },
                    {
                        name: "% Scores",
                        property: "average",
                        class: "text-center",
                        valueSuffix: "%",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        },
                    }
                ],
                "sortByProperty": "average",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            }
        }
    },

    grade_wise_avg_student_assessment_score_barchart: {
        "label": "Assessment Summary",
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "barChart":"SELECT grade,round(cast(AVG(obtained_marks/total_marks)*100 as numeric),2) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.grade_id, obtained_marks.academicyear_id, obtained_marks.subject_id, obtained_marks.exam_id, grade.grade FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id) AS student_assessment GROUP BY grade;"
                    },
                    "level": "district"
                }
            },
            {
                "name": "District",
                "labelProp": "district_name",
                "valueProp": "district_id",
                "hierarchyLevel": "2",
                "actions": {
                    "queries": {
                        "barChart": "SELECT grade,round(cast(AVG(obtained_marks/total_marks)*100 as numeric),2) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.grade_id, obtained_marks.subject_id, obtained_marks.academicyear_id, grade.grade, district.district_id, obtained_marks.exam_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.district AS district ON district.district_id = school.district_id) AS student_assessment WHERE district_id = {district_id} GROUP BY grade"
                    },
                    "level": "block"
                }
            },
            {
                "name": "Block",
                "labelProp": "block_name",
                "valueProp": "block_id",
                "hierarchyLevel": "3",
                "actions": {
                    "queries": {
                        "barChart": "SELECT grade,round(cast(AVG(obtained_marks/total_marks)*100 as numeric),2) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.grade_id, obtained_marks.academicyear_id, obtained_marks.subject_id, obtained_marks.exam_id, grade.grade, block.block_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.block AS block ON block.block_id = school.block_id) AS student_assessment WHERE block_id = {block_id} GROUP BY grade;"
                    },
                    "level": "cluster"
                }
            },
            {
                "name": "Cluster",
                "labelProp": "cluster_name",
                "valueProp": "cluster_id",
                "hierarchyLevel": "4",
                "actions": {
                    "queries": {
                        "barChart": "SELECT grade,round(cast(AVG(obtained_marks/total_marks)*100 as numeric),2) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.grade_id, obtained_marks.academicyear_id, obtained_marks.subject_id, obtained_marks.exam_id, grade.grade, cluster.cluster_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.cluster AS cluster ON cluster.cluster_id = school.cluster_id) AS student_assessment WHERE cluster_id = {cluster_id} GROUP BY grade;"
                    },
                    "level": "school"
                }
            },
            {
                "name": "School",
                "labelProp": "school_name",
                "valueProp": "school_id",
                "hierarchyLevel": "5",
                "actions": {
                    "queries": {
                        "barChart": "SELECT grade,round(cast(AVG(obtained_marks/total_marks)*100 as numeric),2) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.grade_id, obtained_marks.academicyear_id, obtained_marks.subject_id, obtained_marks.exam_id, grade.grade, school.school_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id) AS student_assessment WHERE school_id = {school_id} GROUP BY grade;"
                    },
                    "level": "grade"
                }
            },
            // {
            //     "name": "Grade",
            //     "labelProp": "grade",
            //     "valueProp": "grade",
            //     "hierarchyLevel": "6",
            //     "actions": {
            //         "queries": {
            //             "barChart": ""
            //         },
            //         "level": "grade"
            //     }
            // }
        ],
        "options": {
            "barChart": {
                "metricLabelProp": "Average Student Assessment Scores",
                "metricValueProp": "average",
                "yAxis": {
                    "title": "% Scores "
                },
                "xAxis": {
                    "title": "Grades",
                    "label": "grade",
                    "value": "grade",

                }
            }
        }
    },

    subject_wise_avg_student_assessment_barchart: {
        "label": "Assessment Summary",
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "barChart":"SELECT subject,round(cast(AVG(obtained_marks/total_marks)*100 as numeric),2) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.grade_id, obtained_marks.academicyear_id, obtained_marks.subject_id, obtained_marks.exam_id, subject.subject FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id) AS student_assessment GROUP BY subject;"
                    },
                    "level": "district"
                }
            },
            {
                "name": "District",
                "labelProp": "district_name",
                "valueProp": "district_id",
                "hierarchyLevel": "2",
                "actions": {
                    "queries": {
                        "barChart":"SELECT subject,round(cast(AVG(obtained_marks/total_marks)*100 as numeric),2) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.subject_id, obtained_marks.grade_id, obtained_marks.exam_id, obtained_marks.academicyear_id, subject.subject, district.district_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id INNER JOIN dimensions.district AS district ON district.district_id = school.district_id) AS student_assessment WHERE district_id = {district_id} GROUP BY subject;",
                    },
                    "level": "block"
                }
            },
            {
                "name": "Block",
                "labelProp": "block_name",
                "valueProp": "block_id",
                "hierarchyLevel": "3",
                "actions": {
                    "queries": {
                        "barChart":"SELECT subject,round(cast(AVG(obtained_marks/total_marks)*100 as numeric),2) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.subject_id, obtained_marks.grade_id, obtained_marks.exam_id, obtained_marks.academicyear_id, subject.subject, block.block_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id INNER JOIN dimensions.block AS block ON block.block_id = school.block_id) AS student_assessment WHERE block_id = {block_id} GROUP BY subject;"
                    },
                    "level": "cluster"
                }
            },
            {
                "name": "Cluster",
                "labelProp": "cluster_name",
                "valueProp": "cluster_id",
                "hierarchyLevel": "4",
                "actions": {
                    "queries": {
                        "barChart":"SELECT subject,round(cast(AVG(obtained_marks/total_marks)*100 as numeric),2) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.subject_id, obtained_marks.grade_id, obtained_marks.exam_id, obtained_marks.academicyear_id, subject.subject, cluster.cluster_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id INNER JOIN dimensions.cluster AS cluster ON cluster.cluster_id = school.cluster_id) AS student_assessment WHERE cluster_id = {cluster_id} GROUP BY subject;"
                    },
                    "level": "school"
                }
            },
            {
                "name": "School",
                "labelProp": "school_name",
                "valueProp": "school_id",
                "hierarchyLevel": "5",
                "actions": {
                    "queries": {
                        "barChart":"SELECT subject,round(cast(AVG(obtained_marks/total_marks)*100 as numeric),2) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.subject_id, obtained_marks.academicyear_id, obtained_marks.grade_id, obtained_marks.exam_id, subject.subject, school.school_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id) AS student_assessment WHERE school_id = {school_id} GROUP BY subject;"
                    },
                    "level": "grade"
                }
            },
            // {
            //     "name": "Grade",
            //     "labelProp": "grade",
            //     "valueProp": "grade",
            //     "hierarchyLevel": "6",
            //     "actions": {
            //         "queries": {
            //             "barChart": "",
            //         },
            //         "level": "grade"
            //     }
            // }
        ],
        "options": { 
            "barChart": {
                "metricLabelProp": "Average Student Assessment Scores",
                "metricValueProp": "average",
                "yAxis": {
                    "title": "% Scores"
                },
                "xAxis": {
                    "title": "Subjects",
                    "label": "subject",
                    "value": "subject",

                }
            }
        }
    },

    map_view_of_student_assessments: {
        "label": "Map View",
        "filters": [
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "map": "SELECT t.district_id,t.grade_id, t.grade,t.exam_id,t.exam_name,t.academicyear_id, t.academicyear, t.subject_id, t.subject, t.district_name,round(cast(avg(t.obtained_marks/t.total_marks)*100 as numeric), 2) AS scores FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.grade_id, obtained_marks.exam_id, obtained_marks.academicyear_id, obtained_marks.subject_id, school.district_id, district.district_name, grade.grade, subject.subject, academicyear.academicyear, exam.exam_name FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.district ON district.district_id = school.district_id INNER JOIN dimensions.grade ON obtained_marks.grade_id = grade.grade_id INNER JOIN dimensions.academicyear ON academicyear.academicyear_id = obtained_marks.academicyear_id INNER JOIN dimensions.exam ON exam.exam_id = obtained_marks.exam_id INNER JOIN dimensions.subject ON subject.subject_id = obtained_marks.subject_id) as t group by t.district_id,t.grade_id,t.exam_id,t.academicyear_id,t.subject_id,t.district_name, t.grade, t.subject, t.exam_name, t.academicyear"
                    },
                    "level": "district"
                }
            },
            {
                "name": "District",
                "hierarchyLevel": "2",
                "actions": {
                    "queries": {
                        "map": "SELECT avg(cast(t.latitude as numeric)) as latitude, avg(cast (t.longitude as numeric)) as longitude, t.block_id, t.block_name, t.district_id,t.grade_id, t.grade,t.exam_id,t.exam_name,t.academicyear_id, t.academicyear, t.subject_id, t.subject, t.district_name,round(cast(avg(t.obtained_marks/t.total_marks)*100 as numeric), 2) AS scores FROM ( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.grade_id, obtained_marks.exam_id, obtained_marks.academicyear_id, obtained_marks.subject_id, school.district_id, school.block_id, district.district_name, block.block_name, grade.grade, subject.subject, academicyear.academicyear, exam.exam_name, school.latitude, school.longitude FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.district ON district.district_id = school.district_id INNER JOIN dimensions.block ON block.block_id = school.block_id INNER JOIN dimensions.grade ON obtained_marks.grade_id = grade.grade_id INNER JOIN dimensions.academicyear ON academicyear.academicyear_id = obtained_marks.academicyear_id INNER JOIN dimensions.exam ON exam.exam_id = obtained_marks.exam_id INNER JOIN dimensions.subject ON subject.subject_id = obtained_marks.subject_id) as t WHERE district_id = {district_id} group by t.block_id, t.block_name, t.district_id,t.grade_id,t.exam_id,t.academicyear_id,t.subject_id,t.district_name, t.grade, t.subject, t.exam_name, t.academicyear"
                    },
                    "level": "block"
                }
            },
            {
                "name": "Block",
                "hierarchyLevel": "3",
                "actions": {
                    "queries": {
                        "map": "SELECT avg(cast(t.latitude as numeric)) as latitude, avg(cast (t.longitude as numeric)) as longitude, t.cluster_id, t.cluster_name,t.block_id, t.block_name, t.district_id,t.grade_id, t.grade,t.exam_id,t.exam_name,t.academicyear_id, t.academicyear, t.subject_id, t.subject, t.district_name,round(cast(avg(t.obtained_marks/t.total_marks)*100 as numeric), 2) AS scores FROM ( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.grade_id, obtained_marks.exam_id, obtained_marks.academicyear_id, obtained_marks.subject_id, school.district_id, school.block_id, school.cluster_id, district.district_name, block.block_name, cluster.cluster_name, grade.grade, subject.subject, academicyear.academicyear, exam.exam_name, school.latitude, school.longitude FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.district ON district.district_id = school.district_id INNER JOIN dimensions.block ON block.block_id = school.block_id INNER JOIN dimensions.cluster ON cluster.cluster_id = school.cluster_id INNER JOIN dimensions.grade ON obtained_marks.grade_id = grade.grade_id INNER JOIN dimensions.academicyear ON academicyear.academicyear_id = obtained_marks.academicyear_id INNER JOIN dimensions.exam ON exam.exam_id = obtained_marks.exam_id INNER JOIN dimensions.subject ON subject.subject_id = obtained_marks.subject_id) as t WHERE block_id = {block_id} group by t.cluster_id, t.cluster_name, t.block_id, t.block_name, t.district_id,t.grade_id,t.exam_id,t.academicyear_id,t.subject_id,t.district_name, t.grade, t.subject, t.exam_name, t.academicyear"
                    },
                    "level": "cluster"
                }
            },
            {
                "name": "Cluster",
                "hierarchyLevel": "4",
                "actions": {
                    "queries": {
                        "map": "SELECT latitude, longitude, t.school_name, t.school_id, t.cluster_id, t.cluster_name,t.block_id, t.block_name, t.district_id,t.grade_id, t.grade,t.exam_id,t.exam_name,t.academicyear_id, t.academicyear, t.subject_id, t.subject, t.district_name,round(cast(avg(t.obtained_marks/t.total_marks)*100 as numeric), 2) AS scores FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.grade_id, obtained_marks.exam_id, obtained_marks.academicyear_id, obtained_marks.subject_id, school.district_id, school.block_id, school.cluster_id, school.school_id, district.district_name, block.block_name, cluster.cluster_name, school.school_name, grade.grade, subject.subject, academicyear.academicyear, exam.exam_name, school.latitude, school.longitude FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.district ON district.district_id = school.district_id INNER JOIN dimensions.block ON block.block_id = school.block_id INNER JOIN dimensions.cluster ON cluster.cluster_id = school.cluster_id INNER JOIN dimensions.grade ON obtained_marks.grade_id = grade.grade_id INNER JOIN dimensions.academicyear ON academicyear.academicyear_id = obtained_marks.academicyear_id INNER JOIN dimensions.exam ON exam.exam_id = obtained_marks.exam_id INNER JOIN dimensions.subject ON subject.subject_id = obtained_marks.subject_id) as t WHERE cluster_id = {cluster_id} group by t.school_id, t.school_name, t.cluster_id, t.cluster_name, t.block_id, t.block_name, t.district_id,t.grade_id,t.exam_id,t.academicyear_id,t.subject_id,t.district_name, t.grade, t.subject, t.exam_name, t.academicyear, t.latitude, t.longitude"
                    },
                    "level": "school"
                }
            }
        ],
        "options": {
            "map": {
                "indicatorType": "percent",
                "metricFilterNeeded": false,
                "indicator": "scores",
                "legend": {
                    "title": "Average Student Assessment Scores"
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "District Name: ",
                        "value": "district_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "District ID: ",
                        "value": "district_id",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Block Name: ",
                        "value": "block_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Block ID: ",
                        "value": "block_id",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Cluster Name: ",
                        "value": "cluster_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Cluster ID: ",
                        "value": "cluster_id",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "School Name: ",
                        "value": "school_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "School ID: ",
                        "value": "school_id",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Average Student Assessment Scores: ",
                        "value": "scores",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Academic Year: ",
                        "value": "academicyear",
                        "valueSuffix": "\n"
                    },
                    // {
                    //     "valuePrefix": "Exam: ",
                    //     "value": "exam_name",
                    //     "valueSuffix": "\n"
                    // },
                    {
                        "valuePrefix": "Grade: ",
                        "value": "grade",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Subject: ",
                        "value": "subject",
                        "valueSuffix": "\n"
                    },
                    
                ]
            }
        }
    },

    lo_wise_avg_student_assessment_score_table: {
        "label": "LO Summary",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "table":"SELECT grade,subject,lo_name, round(cast(AVG(OBTAINED_MARKS / TOTAL_MARKS) * 100 as numeric), 2) AS SCORES FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.grade_id, obtained_marks.academicyear_id, obtained_marks.subject_id, obtained_marks.lo_id, grade.grade, obtained_marks.exam_id, subject.subject, lo.lo_name, school.district_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id INNER JOIN dimensions.lo AS lo ON lo.lo_id = obtained_marks.lo_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.district AS district ON district.district_id = school.district_id) AS student_assessment GROUP BY grade,subject,lo_name;"
                    },
                    "level": "district"
                }
            },
            {
                "name": "District",
                "labelProp": "district_name",
                "valueProp": "district_id",
                "hierarchyLevel": "2",

                "actions": {
                    "queries": {
                        "table": "SELECT grade,subject,lo_name, round(cast(AVG(OBTAINED_MARKS / TOTAL_MARKS) * 100 as numeric), 2) AS SCORES FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.grade_id, obtained_marks.academicyear_id, obtained_marks.subject_id, obtained_marks.lo_id, grade.grade, obtained_marks.exam_id, subject.subject, lo.lo_name, school.district_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id INNER JOIN dimensions.lo AS lo ON lo.lo_id = obtained_marks.lo_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.district AS district ON district.district_id = school.district_id) AS student_assessment WHERE district_id = {district_id} GROUP BY grade,subject,lo_name"
                    },
                    "level": "block"
                }
            },
            {
                "name": "Block",
                "labelProp": "block_name",
                "valueProp": "block_id",
                "hierarchyLevel": "3",
                "actions": {
                    "queries": {
                        "table": "SELECT grade,subject,lo_name, round(cast(AVG(OBTAINED_MARKS / TOTAL_MARKS) * 100 as numeric), 2) AS SCORES FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.grade_id, obtained_marks.academicyear_id, obtained_marks.subject_id, obtained_marks.lo_id, grade.grade, subject.subject, lo.lo_name, obtained_marks.exam_id, school.block_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id INNER JOIN dimensions.lo AS lo ON lo.lo_id = obtained_marks.lo_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.block AS block ON block.block_id = school.block_id) AS student_assessment WHERE block_id = {block_id} GROUP BY grade,subject,lo_name;"
                    },
                    "level": "cluster"
                }
            },
            {
                "name": "Cluster",
                "labelProp": "cluster_name",
                "valueProp": "cluster_id",
                "hierarchyLevel": "4",
                "actions": {
                    "queries": {
                        "table": "SELECT grade,subject,lo_name, round(cast(AVG(OBTAINED_MARKS / TOTAL_MARKS) * 100 as numeric), 2) AS SCORES FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.grade_id, obtained_marks.academicyear_id, obtained_marks.subject_id, obtained_marks.lo_id, grade.grade, subject.subject, lo.lo_name, obtained_marks.exam_id, school.cluster_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id INNER JOIN dimensions.lo AS lo ON lo.lo_id = obtained_marks.lo_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.cluster AS cluster ON cluster.cluster_id = school.cluster_id) AS student_assessment WHERE cluster_id = {cluster_id} GROUP BY grade,subject,lo_name;"
                    },
                    "level": "school"
                }
            },
            {
                "name": "School",
                "labelProp": "school_name",
                "valueProp": "school_id",
                "hierarchyLevel": "5",
                "actions": {
                    "queries": {
                        "table": "SELECT grade,subject,lo_name, round(cast(AVG(OBTAINED_MARKS / TOTAL_MARKS) * 100 as numeric), 2) AS SCORES FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.grade_id, obtained_marks.academicyear_id, obtained_marks.subject_id, obtained_marks.lo_id, grade.grade, subject.subject, obtained_marks.exam_id, lo.lo_name, school.school_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.lo AS lo ON lo.lo_id = obtained_marks.lo_id) AS student_assessment WHERE school_id = {school_id} GROUP BY grade,subject,lo_name;"
                    },
                    "level": "school"
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "Grade",
                        property: "grade",
                        class: "text-center"
                    },
                    {
                        name: "Subject",
                        property: "subject",
                        class: "text-center"
                    },
                    {
                        name: "LO",
                        property: "lo_name",
                        class: "text-center"
                    },
                    {
                        name: "% Scores",
                        property: "scores",
                        class: "text-center",
                        valueSuffix: "%",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        },
                    }
                ],
                "sortByProperty": "subject",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            }
        }

    }


}