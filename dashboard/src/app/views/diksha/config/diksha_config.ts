export const config = {
    filters: [
        {   
            "label": "ETB Coverage Status",
            "name":"Medium",
            "id": "medium",
            "labelProp": "medium",
            "valueProp": "medium",
            "query": "select medium from dimensions.medium ORDER BY id ASC "
        },
        {
            "label": "Content Coverage on QR",
            "name":"Medium",
            "id": "medium",
            "labelProp": "medium",
            "valueProp": "medium",
            "query": "select medium from dimensions.medium ORDER BY id ASC "
        },
    ],

    etb_coverage_status_bignumber: {
        "label": "ETB Coverage Status",
        "filters": [
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber": " select round(cast(avg(sum) as numeric),2) as total_coverage from datasets.diksha_linkedqrcount_textbookdiksha0grade0subject0medium"
                    },
                    "level": "District",
                    "nextLevel": "Block"
                }
            }
        ],
        "options": {
            "bigNumber": {
                "title":"Overall ETB Coverage",
                "valueSuffix": "%",
                "property": "total_coverage"
            }
        }
    },

    etb_coverage_status: {
        "label": "ETB Coverage Status",
        "filters": [{
            "name": "State",
            "hierarchyLevel": "1",
            "actions": {
                "queries": {
                    "table": "select subject as subject , grade as class , round(cast(sum(sum) as numeric),2) as performance from datasets.diksha_linkedqrcount_textbookdiksha0grade0subject0medium as t1 group by subject ,grade "
                },
                "level": "District",
                "nextLevel": "Block"
            }
        }],
        "options": {
            "table": {
                "groupByNeeded": true,
                "metricLabelProp": "class",
                "metricValueProp": "performance",
                "columns": [
                  
                    {
                        name: "Subject",
                        property: "subject",
                        class: "text-center"
                    },
                    {
                        name: "Class",
                        groupByNeeded: true,
                        property: "class",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 75
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 50
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
                "sortDirection": "asc"
            }
        }
    },

    content_coverage_bignumber:
    {
        "label": "Content Coverage on QR",
        "filters": [{
            "name": "State",
             "hierarchyLevel": "1",
            "actions": {
                "queries": {
                    "bigNumber": " select round(cast(avg(sum) as numeric),2) as content_coverage from datasets.diksha_qrcoverage_textbookdiksha0grade0subject0medium "
                },
                "level": "District",
                "nextLevel": "Block"
            }
        }],
        "options": {
            "bigNumber": {
                "title":"Content Coverage on QR",
                "valueSuffix": "%",
                "property": "content_coverage"
            }
        }
    },

    content_coverage: {
        "label": "Content Coverage on QR",
        "filters": [{
            "name": "State",
            "hierarchyLevel": "1",
            "actions": {
                "queries": {
                    "table": "select subject as subject , grade as class , round(cast(avg(sum) as numeric),2) as performance from datasets.diksha_contentqrcode_textbookdiksha0grade0subject0medium as t1 group by subject ,grade "
                },
                "level": "District",
                "nextLevel": "Block"
            }
        }],
        "options": {
            "table": {
                "groupByNeeded": true,
                "metricLabelProp": "class",
                "metricValueProp": "performance",
                "columns": [
                  
                    {
                        name: "Subject",
                        property: "subject",
                        class: "text-center"
                    },
                    {
                        name: "Class",
                        groupByNeeded: true,
                        property: "class",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 75
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 50
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
                "sortDirection": "asc"
            }
        }
    },

    // learning_sessions: {
    //     "label": "Learning Sessions",
    //     "filters": [{
    //         "name": "State",
    //         "hierarchyLevel": "1",
    //         "actions": {
    //             "queries": {
    //                 "barChart": ""
    //             },
    //             "level": "district",
    //             "nextLevel": "block"
    //         }
    //     }],
    //     "options": {
    //         "barChart": {
    //             "metricLabelProp": "",
    //             "metricValueProp": "",
    //             "yAxis": {
    //                 "title": ""
    //             },
    //             "xAxis": {
    //                 "title": "",
    //                 "label": "",
    //                 "value": ""
    //             }
    //         }
    //     }
    // },

    learning_sessions_on_potential_users: {
        "label": "Learning Sessions on Potential Users",
        "filters": [
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "map": "select t2.state_name  ,sum(t1.sum) as users, latitude, longitude from datasets.diksha_plays_per_capita_state as t1 join dimensions.state as t2 on t1.state_id = t2.state_id group by t2.state_name, latitude, longitude"
                    },
                    "level": "district",
                    "nextLevel": "block"
                }
            }
        ],
        "options": {
            "map": {
                "metricFilterNeeded": false,
                "indicator": "users",
                "legend": {
                    "title": "Learning Sessions on Potential Users"
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/ UT Name",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Learning Sessions on Potential Users",
                        "value": "users",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },

    diksha_metrics: {
        "label": "ETB Coverage Status",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber1": "select sum(sum) as total_etbs from datasets.diksha_resourcecount_textbookdiksha0grade0subject0medium",
                        "bigNumber2": "select sum(sum) as total_qr_codes from datasets.diksha_totalqrcodes_textbookdiksha0grade0subject0medium",
                        "bigNumber3": "select round(cast(avg(sum) as numeric),2) as content_coverage from datasets.diksha_qrcoverage_textbookdiksha0grade0subject0medium",
                        "bigNumber4":""
                    },
                    "level": "district"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Total ETBs','Total QR Codes','Content Coverage on QR','Total Content'],
                "valueSuffix": ['','','%',''],
                "property": ['total_etbs','total_qr_codes','content_coverage','']
            }
        }
    }



}