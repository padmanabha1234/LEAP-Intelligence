export const config = {
    filters: [
        {
            "label": "District Wise Performance",
            "name": "Grade",
            "id": "grade",
            "tableAlias": "t",
            "labelProp": "grade",
            "valueProp": "grade",
            "query": "select grade from datasets.nas_performance_grade"
        },
        {
            "label": "District Wise Performance",
            "name": "Subject",
            "id": "subject",
            "tableAlias": "t",
            "labelProp": "subject",
            "valueProp": "subject",
            "query": "select subject from datasets.nas_performance_subject"
        },
        {
            "label": "District Wise Performance",
            "name": "Learning Outcome Code",
            "tableAlias": "t",
            "id": "lo_code",
            "labelProp": "lo_code",
            "valueProp": "lo_code",
            "query": "select lo_code from datasets.nas_performance_lonas"
        },
        {
            "label": "Grade & Subject Performance",
            "name": "Grade",
            "id": "grade",
            "labelProp": "grade",
            "valueProp": "grade",
            "query": "select grade from datasets.nas_performance_grade"
        },
        {
            "label": "Grade & Subject Performance",      
            "name": "Subject",
            "id": "subject",
            "labelProp": "subject",
            "valueProp": "subject",
            "query": "select subject from datasets.nas_performance_subject"
        },
      
        {
            "label": "State Wise Performance",
            "name": "Grade",
            "id": "grade",
            "tableAlias": "t",
            "labelProp": "grade",
            "valueProp": "grade",
            "query": "select grade from datasets.nas_performance_grade"
        },
        {
            "label": "State Wise Performance",
            "name": "Subject",
            "id": "subject",
            "tableAlias": "t",
            "labelProp": "subject",
            "valueProp": "subject",
            "query": "select subject from datasets.nas_performance_subject"
        },
        {
            "label": "State Wise Performance",
            "name": "Learning Outcome Code",
            "tableAlias": "t",
            "id": "lo_code",
            "labelProp": "lo_code",
            "valueProp": "lo_code",
            "query": "select lo_code from datasets.nas_performance_lonas"
        },

    ],
    nas_implementation_status: {
        "label": "Implementation Status",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "map": "select d.latitude, d.longitude, t.state_id,state_name ,t.status from dimensions.state as d join (select state_id , case when sum > 0 then 'YES' else 'NO' end as status from datasets.nas_started_state) as t on  d.state_id = t.state_id order by d.state_name asc"
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
                    "title": "Implemented NAs"
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/ UT Name :",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Implemented NAS : ",
                        "value": "status",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },
    
    district_wise_performance:
    {
        "label": "District Wise Performance",
        "filters":
            [
                {
                    "name": "National",
                    "hierarchyLevel": "0",
                    "actions":
                    {
                        "queries":
                        {
                            "map":"select t.district_id, district_name,latitude,longitude, lo_name, round(cast(avg(t.sum) as numeric ),2) as performance from datasets.nas_performance_district0lonas0subject0grade as t join dimensions.lonas as lo on t.lo_code = lo.lo_code join dimensions.district as d on t.district_id = d.district_id group by t.district_id, district_name,lo_name,latitude,longitude"
                        },
                        "level": "state",
                        "nextLevel": "district"
                    }
                },
                {
                    "name": "State",
                    "hierarchyLevel": "1",
                    "actions":
                    {
                        "queries": {
                            "map": "select t.lo_code, round(cast(avg(t.sum) as numeric),2) as performance, t.district_id, district_name, latitude, longitude from datasets.nas_performance_district0lonas0subject0grade as t join dimensions.district as d on t.district_id = d.district_id join datasets.nas_performance_lonas as l on t.lo_code = l.lo_code group by t.district_id, district_name, t.lo_code, latitude, longitude"
                        },
                        "level": "district",
                        "nextLevel": "block"
                    }
                }
            ],
        "options":
        {
            "map":
            {
                "indicator": "performance",
                "indicatorType": "percent",
                "legend": {
                    "title": "NAS Performance"
                },
                "tooltipMetrics":
                    [
                        {
                            "valuePrefix": "District Name: ",
                            "value": "district_name",
                            "valueSuffix": "\n"
                        },
                        {
                            "valuePrefix": "Learning Outcome: ",
                            "value": "lo_code",
                            "valueSuffix": "\n"
                        },
                        {
                            "valuePrefix": "Learning Outcome: ",
                            "value": "lo_name",
                            "valueSuffix": "\n"
                        },
                        {
                            "valuePrefix": "Performance: ",
                            "value": "performance",
                            "valueSuffix": "%\n"
                        }
                    ]
            }
        }
    },

    grade_and_subject_performance: {
        "label": "Grade & Subject Performance",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions":
                {
                    "queries": {
                        "table": "select t.lo_code, grade, subject, round(cast(avg(t.sum) as numeric),2) as performance, state_name, state_name as location from datasets.nas_performance_state0lonas0subject0grade as t join dimensions.state as d on t.state_id = d.state_id group by t.state_id, state_name, subject, grade, t.lo_code"
                    },
                    "level": "district",
                    "nextLevel": "block"
                }
            },
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions":
                {
                    "queries": {
                        "table": "select t.lo_code, grade, subject, ROUND(CAST(avg(t.sum) AS numeric), 2) AS performance, district_name, district_name as location from datasets.nas_performance_district0lonas0subject0grade as t join dimensions.district as d on t.district_id = d.district_id join datasets.nas_performance_lonas as l on t.lo_code = l.lo_code group by t.district_id, district_name, subject, grade, t.lo_code, t.lo_code"
                    },
                    "level": "district",
                    "nextLevel": "block"
                }
            }
        ],
        "options": {
            "table": {
                "groupByNeeded": true,
                "metricLabelProp": "location",
                "metricValueProp": "performance",
                "columns": [
                    {
                        name: "Learning Outcome Code",
                        property: "lo_code",
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
                        name: "Location",
                        groupByNeeded: true,
                        property: "location",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#007000",
                                    breakPoint: 70
                                },
                                {
                                    color: "#FFBF00",
                                    breakPoint: 40
                                },
                                {
                                    color: "#D2222D",
                                    breakPoint: 0
                                }
                            ]
                        },
                    }
                ],
                "sortByProperty": "lo_code",
                "sortDirection": "asc"
            }
        }
    },

    nas_metrics: {
        "label": "District Wise Performance",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "bigNumber1": "",
                        "bigNumber2": "",
                        "bigNumber3": "select sum(sum) as total_teachers from datasets.nas_no_of_teachers_state",
                        "bigNumber4": "select count(distinct state_id) as total_states from datasets.nas_started_state where sum > 0",
                        "bigNumber5": ""
                    },
                    "level": "State"
                }
            },
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber1": "select sum(a.sum) as total_schools from datasets.nas_schools_fmfdoxoqhb0gdwdvfaya as a",
                        "bigNumber2": "select sum(a.sum) as students_surveyed from datasets.nas_students_surveyed_state as a",
                        "bigNumber3": "select sum(a.sum) as total_teachers from datasets.nas_teachers_bnfzbxamehcadbehbxqg as a",
                    },
                    "level": "district"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Total Schools', 'Total Students Surveyed', 'Total Teachers', 'Total States/UTs Participating', 'Total LOs Tested'],
                "valueSuffix": ['', '', '', '', ''],
                "property": ['total_schools', 'students_surveyed', 'total_teachers', 'total_states', 'total_lo_tested']
            }
        }
    },

    nas_state_wise_performance: {
        "label": "State Wise Performance",
        "filters":
            [
                {
                    "name": "National",
                    "hierarchyLevel": "0",
                    "actions":
                    {
                        "queries":
                        {
                            "map":"select latitude, longitude, t.state_id, state_name,lo_name, round(cast(avg(t.sum) as numeric ),2) as performance from datasets.nas_performance_state0lonas0subject0grade as t join dimensions.state as s on t.state_id = s.state_id join dimensions.lonas as lo on t.lo_code = lo.lo_code group by t.state_id, state_name, lo_name, latitude, longitude"
                        },
                        "level": "state",
                        "nextLevel": "district"
                    }
                }
            ],
        "options":
        {
            "map":
            {
                "indicatorType": "percent",
                "indicator": "performance",
                "legend": {
                    "title": "State Wise Performance"
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/UT Name: ",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Learning Outcome :",
                        "value": "lo_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Performance: ",
                        "value": "performance",
                        "valueSuffix": "%\n"
                    }
                ]
            }
        }
    }
}