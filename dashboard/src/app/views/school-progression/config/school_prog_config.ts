export const config = {
    filters: [
        {
            "name": "Academic Year",
            "id": "academicYear",
            "labelProp": "academicyear",
            "valueProp": "academicyear_id",
            "query": "select academicyear_id, academicyear from dimensions.academicyear order by academicyear_id asc"
        }
    ],
    config: {
        "label": "Schools Reporting Student Attendance",
        "defaultLevel": "state",
        "timeSeriesQueries": '',
        "queries": {
            "avg_score": "select round((sum(progression.sum)*100)/count(progression.school_id)) as percent_school_met_criteria from datasets.student_progression_progression_school0academicyear as progression inner join dimensions.school on progression.school_id = school.school_id where academicyear_id = '2021-2022';",

            "district_map": `
                SELECT SCHOOL.DISTRICT_NAME,
                    SCHOOL.DISTRICT_ID,
                    AVG(CAST (LATITUDE AS numeric)) AS LATITUDE,
	                AVG(CAST (LONGITUDE AS numeric)) AS LONGITUDE,
                    COUNT(PROGRESSION.SCHOOL_ID) AS TOTAL_NO_OF_SCHOOLS,
                    SUM(PROGRESSION.SUM) AS NO_OF_SCHOOLS_PROG_COMPLETED,
                    ROUND(CAST(SUM(PROGRESSION.SUM) AS NUMERIC) / COUNT(PROGRESSION.SCHOOL_ID) * 100, 2) AS PERCENT_SCHOOL_PROG_COMPLETED,
                    COUNT(PROGRESSION.SCHOOL_ID) - SUM(PROGRESSION.SUM) AS NO_OF_SCHOOLS_PROG_INCOMPLETE,
                    ROUND(CAST(COUNT(PROGRESSION.SCHOOL_ID) - SUM(PROGRESSION.SUM) AS NUMERIC) / COUNT(PROGRESSION.SCHOOL_ID) * 100, 2) AS PERCENT_SCHOOL_PROG_INCOMPLETE
                FROM DATASETS.STUDENT_PROGRESSION_PROGRESSION_BYEQDDMDAVWNYWL1ZWLX AS PROGRESSION
                INNER JOIN DIMENSIONS.SCHOOL ON PROGRESSION.SCHOOL_ID = SCHOOL.SCHOOL_ID
                WHERE filter.academicYear
                GROUP BY SCHOOL.DISTRICT_NAME,
                    SCHOOL.DISTRICT_ID
            `,

            "district_avg_score": "select school.district_name, round((sum(progression.sum)*100)/count(progression.school_id)) as percent_school_met_criteria from datasets.student_progression_progression_school0academicyear as progression inner join dimensions.school on progression.school_id = school.school_id where district_name is not null and district_name != '' and academicyear_id = '2021-2022' group by school.district_name order by round( (sum(progression.sum)*100)/count(progression.school_id) ) desc;",
        },
        "levels": '',
        "filters": [
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "District",
                        property: "district_name",
                        class: "text-center"
                    },
                    {
                        name: "Progression Frozen %",
                        property: "percent_school_met_criteria",
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
                "sortByProperty": "district_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            },
            "map": {
                "indicator": "percent_school_prog_completed",
                "metricFilterNeeded": false,
                "legend": { "title": "District-wise Performance" },
                "indicatorType": "percent",
                "tooltipMetrics": [
                    {
                        "valuePrefix": "District ID: ",
                        "value": "district_id",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "District Name: ",
                        "value": "district_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Percentage of schools where progression is complete: ",
                        "value": "percent_school_prog_completed",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Number of schools where progression is complete: ",
                        "value": "no_of_schools_prog_completed",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Percentage of schools where progression is not complete: ",
                        "value": "percent_school_prog_incomplete",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Number of schools where progression is not complete: ",
                        "value": "no_of_schools_prog_incomplete",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Total number of schools: ",
                        "value": "total_no_of_schools",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },

    district_config: {
        "label": "Schools Reporting Student Attendance",
        "defaultLevel": "state",
        "timeSeriesQueries": '',
        "queries": {
            "district_map": `
                SELECT SCHOOL.DISTRICT_ID,
                    SCHOOL.BLOCK_ID,
                    SCHOOL.BLOCK_NAME,
                    AVG(CAST (LATITUDE AS numeric)) AS LATITUDE,
                    AVG(CAST (LONGITUDE AS numeric)) AS LONGITUDE,
                    COUNT(PROGRESSION.SCHOOL_ID) AS TOTAL_NO_OF_SCHOOLS,
                    SUM(PROGRESSION.SUM) AS NO_OF_SCHOOLS_PROG_COMPLETED,
                    ROUND(CAST(SUM(PROGRESSION.SUM) AS NUMERIC) / COUNT(PROGRESSION.SCHOOL_ID) * 100, 2) AS PERCENT_SCHOOL_PROG_COMPLETED,
                    COUNT(PROGRESSION.SCHOOL_ID) - SUM(PROGRESSION.SUM) AS NO_OF_SCHOOLS_PROG_INCOMPLETE,
                    ROUND(CAST(COUNT(PROGRESSION.SCHOOL_ID) - SUM(PROGRESSION.SUM) AS NUMERIC) / COUNT(PROGRESSION.SCHOOL_ID) * 100, 2) AS PERCENT_SCHOOL_PROG_INCOMPLETE
                FROM DATASETS.STUDENT_PROGRESSION_PROGRESSION_BYEQDDMDAVWNYWL1ZWLX AS PROGRESSION
                INNER JOIN DIMENSIONS.SCHOOL ON PROGRESSION.SCHOOL_ID = SCHOOL.SCHOOL_ID
                WHERE DISTRICT_ID = {district_id} AND filter.academicYear
                GROUP BY SCHOOL.DISTRICT_ID,
                    SCHOOL.BLOCK_ID,
                    SCHOOL.BLOCK_NAME
            `,
        },
        "levels": '',
        "filters": [
            {
                "name": "District",
                "labelProp": "district_name",
                "valueProp": "district_id",
                "hierarchyLevel": "2",
                "actions": {
                    "queries": {
                        "avg_score": "select round((sum(progression.sum)*100)/count(progression.school_id)) as percent_school_met_criteria from datasets.student_progression_progression_school0academicyear as progression inner join dimensions.school on progression.school_id = school.school_id where academicyear_id = '2021-2022' and district_id = {district_id};",

                        "district_avg_score": "select block_name, round((sum(progression.sum)*100)/count(progression.school_id)) as percent_school_met_criteria from datasets.student_progression_progression_school0academicyear as progression inner join dimensions.school on progression.school_id = school.school_id where academicyear_id = '2021-2022' and district_id = {district_id} group by block_name;",
                    }
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "Block",
                        property: "block_name",
                        class: "text-center"
                    },
                    {
                        name: "Progression Frozen %",
                        property: "percent_school_met_criteria",
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
                "sortByProperty": "block_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            },
            "map": {
                "indicator": "percent_school_prog_completed",
                "metricFilterNeeded": false,
                "legend": { "title": "Block-wise Performance" },
                "indicatorType": "percent",
                "tooltipMetrics": [
                    {
                        "valuePrefix": "Block ID: ",
                        "value": "block_id",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Block Name: ",
                        "value": "block_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Percentage of schools where progression is complete: ",
                        "value": "percent_school_prog_completed",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Number of schools where progression is complete: ",
                        "value": "no_of_schools_prog_completed",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Percentage of schools where progression is not complete: ",
                        "value": "percent_school_prog_incomplete",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Number of schools where progression is not complete: ",
                        "value": "no_of_schools_prog_incomplete",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Total number of schools: ",
                        "value": "total_no_of_schools",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },

    block_config: {
        "label": "Schools Reporting Student Attendance",
        "defaultLevel": "state",
        "timeSeriesQueries": '',
        "queries": {
            "district_map": `
                SELECT SCHOOL.BLOCK_ID,
                    SCHOOL.CLUSTER_ID,
                    SCHOOL.CLUSTER_NAME,
                    AVG(CAST (LATITUDE AS numeric)) AS LATITUDE,
                    AVG(CAST (LONGITUDE AS numeric)) AS LONGITUDE,
                    COUNT(PROGRESSION.SCHOOL_ID) AS TOTAL_NO_OF_SCHOOLS,
                    SUM(PROGRESSION.SUM) AS NO_OF_SCHOOLS_PROG_COMPLETED,
                    ROUND(CAST(SUM(PROGRESSION.SUM) AS NUMERIC) / COUNT(PROGRESSION.SCHOOL_ID) * 100, 2) AS PERCENT_SCHOOL_PROG_COMPLETED,
                    COUNT(PROGRESSION.SCHOOL_ID) - SUM(PROGRESSION.SUM) AS NO_OF_SCHOOLS_PROG_INCOMPLETE,
                    ROUND(CAST(COUNT(PROGRESSION.SCHOOL_ID) - SUM(PROGRESSION.SUM) AS NUMERIC) / COUNT(PROGRESSION.SCHOOL_ID) * 100, 2) AS PERCENT_SCHOOL_PROG_INCOMPLETE
                FROM DATASETS.STUDENT_PROGRESSION_PROGRESSION_BYEQDDMDAVWNYWL1ZWLX AS PROGRESSION
                INNER JOIN DIMENSIONS.SCHOOL ON PROGRESSION.SCHOOL_ID = SCHOOL.SCHOOL_ID
                WHERE BLOCK_ID = {block_id} AND filter.academicYear
                GROUP BY SCHOOL.BLOCK_ID,
                    SCHOOL.CLUSTER_ID,
                    SCHOOL.CLUSTER_NAME
            `
        },
        "levels": '',
        "filters": [
            {
                "name": "Block",
                "labelProp": "block_name",
                "valueProp": "block_id",
                "hierarchyLevel": "3",
                "actions": {
                    "queries": {
                        "avg_score": "select round( (sum(progression.sum)*100)/count(progression.school_id) ) as percent_school_met_criteria from datasets.student_progression_progression_school0academicyear as progression inner join dimensions.school on progression.school_id = school.school_id where district_name != '' and block_id = {block_id};",

                        "district_avg_score": "select cluster_name, round( (sum(progression.sum)*100)/count(progression.school_id) ) as percent_school_met_criteria from datasets.student_progression_progression_school0academicyear as progression inner join dimensions.school on progression.school_id = school.school_id where district_name != '' and block_id = {block_id} group by cluster_name;",
                    }
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "Cluster",
                        property: "cluster_name",
                        class: "text-center"
                    },
                    {
                        name: "Progression Frozen %",
                        property: "percent_school_met_criteria",
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
                "sortByProperty": "cluster_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            },
            "map": {
                "indicator": "percent_school_prog_completed",
                "metricFilterNeeded": false,
                "legend": { "title": "Cluster-wise Performance" },
                "indicatorType": "percent",
                "tooltipMetrics": [
                    {
                        "valuePrefix": "Cluster ID: ",
                        "value": "cluster_id",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Cluster Name: ",
                        "value": "cluster_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Percentage of schools where progression is complete: ",
                        "value": "percent_school_prog_completed",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Number of schools where progression is complete: ",
                        "value": "no_of_schools_prog_completed",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Percentage of schools where progression is not complete: ",
                        "value": "percent_school_prog_incomplete",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Number of schools where progression is not complete: ",
                        "value": "no_of_schools_prog_incomplete",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Total number of schools: ",
                        "value": "total_no_of_schools",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },

    cluster_config: {
        "label": "Schools Reporting Student Attendance",
        "defaultLevel": "state",
        "timeSeriesQueries": '',
        "queries": {
            "district_map": `
                SELECT SCHOOL.CLUSTER_ID,
                    SCHOOL.SCHOOL_ID,
                    SCHOOL.SCHOOL_NAME,
                    LATITUDE,
                    LONGITUDE,
                    CASE WHEN PROGRESSION.SUM = 1 THEN 'Yes' ELSE 'No' END AS STATUS
                FROM DATASETS.STUDENT_PROGRESSION_PROGRESSION_BYEQDDMDAVWNYWL1ZWLX AS PROGRESSION
                INNER JOIN DIMENSIONS.SCHOOL ON PROGRESSION.SCHOOL_ID = SCHOOL.SCHOOL_ID
                WHERE CLUSTER_ID = {cluster_id} AND filter.academicYear
            `
        },
        "levels": '',
        "filters": [
            {
                "name": "District",
                "labelProp": "cluster_name",
                "valueProp": "cluster_id",
                "hierarchyLevel": "4",
                "actions": {
                    "queries": {
                        "avg_score": "select coalesce(round((sum(progression.sum)*100)/count(progression.school_id))::text, '-') as percent_school_met_criteria from datasets.student_progression_progression_school0academicyear as progression inner join dimensions.school on progression.school_id = school.school_id where district_name != '' and cluster_id = {cluster_id}",

                        "district_avg_score": "select school_name, case when progression.sum = 1 THEN 'YES' ELSE 'NO' END as progression_frozen from datasets.student_progression_progression_school0academicyear as progression inner join dimensions.school on progression.school_id = school.school_id where district_name != '' and cluster_id = {cluster_id};",
                    }
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "School",
                        property: "school_name",
                        class: "text-center"
                    },
                    {
                        name: "Progression Frozen %",
                        property: "progression_frozen",
                        class: "text-center",
                        valueSuffix: "",
                        isHeatMapRequired: true,
                        color: {
                            type: "status",
                            values: [
                                {
                                    color: "#d8ead3",
                                    value: "yes"
                                },
                                {
                                    color: "#f4cccc",
                                    value: "no"
                                }
                            ]
                        },
                    }
                ],
                "sortByProperty": "school_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            },
            "map": {
                "indicator": "status",
                "metricFilterNeeded": false,
                "legend": { "title": "School-wise Performance" },
                "indicatorType": "boolean",
                "tooltipMetrics": [
                    {
                        "valuePrefix": "School ID: ",
                        "value": "school_id",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "School Name: ",
                        "value": "school_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Status: ",
                        "value": "status",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },
    school_progression_bignumber: {
        "label": "Average Teachers Reporting Attendance",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber": "select round((sum(progression.sum)*100)/count(progression.school_id)) as percent_school_met_criteria from datasets.student_progression_progression_school0academicyear as progression inner join dimensions.school on progression.school_id = school.school_id where academicyear_id = '2021-2022';"
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
                        "bigNumber": "select round((sum(progression.sum)*100)/count(progression.school_id)) as percent_school_met_criteria from datasets.student_progression_progression_school0academicyear as progression inner join dimensions.school on progression.school_id = school.school_id where academicyear_id = '2021-2022' and district_id = {district_id};"
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
                        "bigNumber": "select round( (sum(progression.sum)*100)/count(progression.school_id) ) as percent_school_met_criteria from datasets.student_progression_progression_school0academicyear as progression inner join dimensions.school on progression.school_id = school.school_id where district_name != '' and block_id = {block_id};"
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
                        "bigNumber": "select round((sum(progression.sum)*100)/count(progression.school_id)) as percent_school_met_criteria from datasets.student_progression_progression_school0academicyear as progression inner join dimensions.school on progression.school_id = school.school_id where district_name != '' and cluster_id = {cluster_id};"
                    },
                    "level": "school"
                }
            }
        ],
        "options": {
            "bigNumber": {
                "title": "Schools that have frozen Student Progression",
                "valueSuffix": '%',
                "property": 'percent_school_met_criteria'
            }
        }
    }

}

