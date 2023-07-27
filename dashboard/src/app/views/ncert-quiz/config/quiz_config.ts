export const config = {
    filters: [
        {
            "label": "Participation Status",
            "name": "Participation",
            "tableAlias": "t",
            "id": "",
            "labelProp": "quiz_name",
            "valueProp": "quiz_name",
            "query": "SELECT quiz_name FROM dimensions.quizncert ORDER BY id ASC "
        },
    ],
    implementation_status: {
        "label": "Implementation Status",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "map": "select t.state_id,state_name ,t.status from dimensions.state as d join (select state_id , case when sum > 0 then 'YES' else 'NO' end as status from datasets.ncert_started_state) as t on  d.state_id = t.state_id order by d.state_name asc"
                    },
                    "level": "state",
                    "nextLevel": "district"
                }
            }
        ],
        "options": {
            "map": {
                "metricFilterNeeded": false,
                "indicator": "status",
                "legend": {
                    "title": "NCERT Quizes Started"
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/ UT Name :",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "NCERT Quizes Started :",
                        "value": "status",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },
    participation_status:
    {
        "label": "Participation Status",
        "filters":
            [
                {
                    "name": "National",
                    "hierarchyLevel": "0",
                    "actions":
                    {
                        "queries":
                        {
                            "map":"select t.state_id,state_name, quiz_name,sum(sum) as enrollments from datasets.ncert_totalenrollments_state0quizncert as t join dimensions.state as t2 on t.state_id=t2.state_id group by t.state_id,quiz_name,state_name"
                        },
                        "level": "state",
                        "nextLevel": "district"
                    }
                },
            ],
        "options":
        {
            "map":
            {
                "indicator": "enrollments",
                "indicatorType": "percent",
                "legend": {
                    "title": "Participation Status"
                },
                "tooltipMetrics":
                    [
                        {
                            "valuePrefix": "State UT/Name : ",
                            "value": "state_name",
                            "valueSuffix": "\n"
                        },
                        {
                            "valuePrefix": "Quiz Name: ",
                            "value": "quiz_name",
                            "valueSuffix": "\n"
                        },
                        {
                            "valuePrefix": "Enrollments: ",
                            "value": "enrollments",
                            "valueSuffix": "\n"
                        },
                    ]
            }
        }
    },
    quiz_wise_status: {
        "label": "Quiz wise Status",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "table":"select t1.quiz_name, sum(t1.sum) as total_enrolments, sum(t2.sum) as certificate_issued,sum(t3.sum) as completion,t4.medium from datasets.ncert_total_enrollments_quizncert as t1 join datasets.ncert_certificate_issued_100_perc_completion_quizncert as t2 on t1.quiz_name = t2.quiz_name join datasets.ncert_completion_perc_quizncert as t3 on t2.quiz_name=t3.quiz_name join  datasets.ncert_totalenrolmentsncert_medium0quizncert as t4 on t3.quiz_name=t4.quiz_name group by t1.quiz_name,t4.medium",
                        },
                    "level": "state",
                    "nextLevel": "district"
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "Quiz Name",
                        property: "quiz_name",
                        class: "text-center"
                    },
                    {
                        name: "Total Enrolments",
                        property: "total_enrolments",
                        class: "text-center"
                    },
                    {
                        name: "Certificate Issued (100% completion)",
                        property: "certificate_issued",
                        class: "text-center"
                    },
                    {
                        name: "Completion %",
                        property: "completion",
                        class: "text-center",
                        valueSuffix: "%",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#1D4586",
                                    breakPoint: 75
                                },
                                {
                                    color: "#1156CC",
                                    breakPoint: 50
                                },
                                {
                                    color: "#6D9FEB",
                                    breakPoint: 0
                                }
                            ]
                        },
                    },
                    {
                        name: "Medium",
                        property: "medium",
                        class: "text-center"
                    }
                ],
            }
        }
    },
}