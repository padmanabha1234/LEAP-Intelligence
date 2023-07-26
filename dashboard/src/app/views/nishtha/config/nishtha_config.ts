export const config = {
    filters: [
        {
            "label": "District Wise Status",
            "name": "Program",
            "labelProp": "program_name",
            "valueProp": "program_name",
            "id": "program_name",
            "tableAlias": "t1",
            "query": "select program_name from dimensions.programnishtha"
        },
        // {
        //     "label": "District Wise Performance",
        //     "name": "Metric",
        //     "labelProp": "category_name",
        //     "valueProp": "category_name",
        //     "id": "metric",
        //     "query": "select category_name from dimensions.categorypgi"
        // },
    ],
    implementation_status: {
        "label": "Implementation Status",
        "filters": [
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "table": "select  program_name , case when sum > 0 then 'YES' else 'NO' end as status from datasets.nishtha_started_programnishtha group by program_name,status  order by program_name",
                    },
                    "level": "district",
                    "nextLevel": "block"
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "Program Name",
                        property: "program_name",
                        class: "text-center"
                    },
                    {
                        name: "Nishtha Started",
                        property: "status",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "status",
                            values: [
                                {
                                    value: "yes",
                                    color: '#b2d58f'
                                },
                                {
                                    value: "no",
                                    color: '#FFD6D6'
                                }
                            ]
                        }
                    }
                ],
            }
        }
    },
    course_and_medium_status: {
        "label": "Courses and Medium Status",
        "filters": [
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                       "table": "select t1.program_name , sum(t1.sum) as total_courses ,sum(t2.sum) as  total_medium from datasets.nishtha_total_courses_programnishtha as t1 join datasets.nishtha_total_medium_programnishtha as t2 on t1.program_name = t2.program_name group by t1.program_name"
                    },
                    "level": "district",
                    "nextLevel": "block"
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "Program Name",
                        property: "program_name",
                        class: "text-center"
                    },
                    {
                        name: "Total Courses Launched",
                        property: "total_courses",
                        class: "text-center"
                    },
                    {
                        name: "Total Mediums",
                        property: "total_medium",
                        class: "text-center"
                    }
                ],
            }
        }
    },
    potential_base: {
        "label": "% against Potential Base",
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "barChart": "select t1.program_name, round(cast(avg(t1.sum) as numeric),2) as target_achieved, round(cast(avg(t1.sum) as numeric) + (cast(avg(t2.sum) as numeric)),2) as total_target from datasets.nishtha_perc_target_achieved_enrolment_programnishtha as t1 join datasets.nishtha_perc_target_remaining_enrolment_programnishtha as t2 on t1.program_name = t2.program_name group by t1.program_name",
                    },
                    "level": "district"
                }
            }
        ],
        "options": {
            "barChart": {
                "isMultibar": true,
                "valueSuffix": "%",
                "yAxis": {
                    "title": "% Target Achieved-Enrolment and \n% Total Target-Enrolment"
                },
                "xAxis": {
                    "title": " Programs",
                    "label": "program_name",
                    "value": "program_name",
                    "metrics": [
                        {
                            "label": "% Target Achieved-Enrolment",
                            "value": "target_achieved"
                        },
                        {
                            "label": "% Total Target-Enrolment",
                            "value": "total_target"
                        }
                    ]
                }
            }
        }
    },
    potential_base_certificates: {
        "label": "% against Potential Base",
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "barChart": "select t1.program_name, round(cast(avg(t1.sum) as numeric),2) as target_achieved, round(cast(avg(t1.sum) as numeric) + (cast(avg(t2.sum) as numeric)),2) as total_target from datasets.nishtha_perc_target_achieved_certificates_programnishtha as t1 join datasets.nishtha_perc_target_remaining_certificates_programnishtha as t2 on t1.program_name = t2.program_name group by t1.program_name",
                    },
                    "level": "district"
                }
            }
        ],
        "options": {
            "barChart": {
                "isMultibar": true,
                "valueSuffix": "%",
                "yAxis": {
                    "title": "% Target Achieved-Certificates and % Total Target-Certificates"
                },
                "xAxis": {
                    "title": " Programs",
                    "label": "program_name",
                    "value": "program_name",
                    "metrics": [
                        {
                            "label": "% Target Achieved-Certificates",
                            "value": "target_achieved"
                        },
                        {
                            "label": "% Total Target-Certificates",
                            "value": "total_target"
                        }
                    ]
                }
            }
        }
    },
    course_wise_status: {
        "label": "Course Wise Status",
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "barChart": "select t1.course_name , t1.sum as total_enrolment , t2.sum as total_certifications from datasets.nishtha_total_enrolment_coursenishtha as t1 join datasets.nishtha_total_certification_coursenishtha  as t2 on t1.course_name = t2.course_name group by t1.course_name,t1.sum,t2.sum ",
                    },
                    "level": "district"
                }
            }
        ],
        "options": {
            "barChart": {
                "isMultibar": true,
                "valueSuffix": "",
                "yAxis": {
                    "title": "Total Enrolement and Certifications"
                },
                "xAxis": {
                    "title": " Courses",
                    "label": "course_name",
                    "value": "course_name",
                    "metrics": [
                        {
                            "label": "Total Entrolments",
                            "value": "total_enrolment"
                        },
                        {
                            "label": "Total Certifications",
                            "value": "total_certifications"
                        }
                    ]
                }
            }
        }
    },
    district_wise_status: {
        "label": "District Wise Status",
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "barChart": "select d.district_name , sum(t1.sum) as total_enrolment , sum(t2.sum) as total_certification from datasets.nishtha_consumptionenrolment_district0programnishtha as t1 join datasets.nishtha_consumptioncertification_district0programnishtha as t2 on t1.district_id = t2.district_id join dimensions.district as d  on t2.district_id=d.district_id group by d.district_name",
                    },
                    "level": "district"
                }
            }
        ],
        "options": {
            "barChart": {
                "isMultibar": true,
                "valueSuffix": "",
                "yAxis": {
                    "title": "Total Enrolment and Certifications"
                },
                "xAxis": {
                    "title": "Districts",
                    "label": "district_name",
                    "value": "district_name",
                    "metrics": [
                        {
                            "label": "Total Enrolments",
                            "value": "total_enrolment"
                        },
                        {
                            "label": "Total Certifications",
                            "value": "total_certification"
                        }
                    ]
                }
            }
        }
    },
    nishtha_metrics: {
        "label": "Progress Status",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber1": "select sum(sum) as total_enrolment from datasets.nishtha_total_enrolment_district",
                        "bigNumber2": "select sum(sum) as total_completion from datasets.nishtha_total_completion_district",
                        "bigNumber3": "select sum(sum) as total_certification from datasets.nishtha_total_certification_district",
                        "bigNumber4": "select sum(sum) as total_mediums from datasets.nishtha_total_medium_programnishtha"
                    },
                    "level": "district"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Total Enrolment', 'Total Completion', 'Total Certification', 'Total Mediums'],
                "valueSuffix": ['', '', '', ''],
                "property": ['total_enrolment', 'total_completion', 'total_certification', 'total_mediums']
            }
        }
    }
}