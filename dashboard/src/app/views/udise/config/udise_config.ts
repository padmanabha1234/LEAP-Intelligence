export const config = {
    filters: [
        {
            "label": "District Wise Performance",
            "name": "Metric",
            "labelProp": "category_name",
            "valueProp": "category_name",
            "id": "metric",
            "query": "select category_name from dimensions.categoryudise"
        },
        {
            "label": "State Wise Performance",
            "name": "Metric",
            "labelProp": "category_name",
            "valueProp": "category_name",
            "id": "metric",
            "query": "select category_name from dimensions.categoryudise"
        },
        {
            "label": "Correlation",
            "name": "First Metric",
            "labelProp": "category_name",
            "valueProp": "category_name",
            "id": "metric",
            "query": "select category_name from dimensions.categoryudise"
        },
        {
            "label": "Correlation",
            "name": "Second Metric",
            "labelProp": "category_name",
            "valueProp": "category_name",
            "id": "metric",
            "query": "select category_name from dimensions.categoryudise"
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
                        "map": "select t.state_id,state_name ,t.status from dimensions.state as d join (select state_id , case when sum > 0 then 'YES' else 'NO' end as status from datasets.udise_started_state) as t on  d.state_id = t.state_id order by d.state_name asc"
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
                    "title": "Implemented Udise"
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/ UT Name: ",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Implemented NAS: ",
                        "value": "status",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },
    district_wise_performance: {
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
                            "map": "select t2.district_name, t1.district_id ,latitude, longitude, t1.category_name,round(cast(sum(t1.sum) as numeric ),2) as percentage from datasets.udise_category_district0categoryudise as t1 join dimensions.district as t2 on t2.district_id = t1.district_id group by t1.district_id, t2.district_name,t1.category_name, latitude, longitude"
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
                        "queries":
                        {
                            "map": "select t2.district_name, t1.district_id , t1.category_name,latitude, longitude,round(cast(sum(t1.sum) as numeric ),2) as percentage from datasets.udise_category_district0categoryudise as t1 join dimensions.district as t2 on t2.district_id = t1.district_id group by t1.district_id, t2.district_name,t1.category_name, latitude, longitude"
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
                "indicatorType": "percent",
                "metricLabelProp": "category_name",
                "metricValueProp": "percentage",
                "groupByColumn": "district_id",
                "metricFilterNeeded": true,
                "legend": { "title": "District Wise Performance" },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "District Name: ",
                        "value": "district_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "",
                        "value": "category_name",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },
    // correlation:
    // {
    //     "label": "Correlation",
    //     "filters":
    //         [
    //             {
    //                 "name": "State",
    //                 "hierarchyLevel": "1",
    //                 "actions":
    //                 {
    //                     "queries":
    //                     {
    //                         "barChart": "select t2.district_name, t1.category_name,round(cast(sum(t1.sum) as numeric ),2) as percentage from datasets.udise_category_district0categoryudise as t1 join dimensions.district as t2 on t2.district_id = t1.district_id group by t2.district_name,t1.category_name"
    //                     },
    //                     "level": "district",
    //                     "nextLevel": "block"
    //                 }
    //             }
    //         ],
    //     "options": {
    //         "barChart": {
    //             "isCorrelation": true,
    //             "MultibarGroupByNeeded": false,
    //             "isMultibar": true,
    //             "metricLabelProp": "",
    //             "metricValueProp": "",
    //             "yAxis": {
    //                 "title": ""
    //             },
    //             "xAxis": {
    //                 "title": "",
    //                 "label": "district_name",
    //                 "value": "district_name",
    //                 "metrics": [
    //                     {
    //                         value: 'PTR', label: 'PTR'
    //                     },
    //                     {
    //                         value: '% schools having toilet', label: '% schools having toilet'
    //                     },
    //                     {
    //                         value: '% schools having drinking water', label: '% schools having drinking water'
    //                     },
    //                     {
    //                         value: '% schools having electricity', label: '% schools having electricity'
    //                     },
    //                     {
    //                         value: '% schools having library', label: '% schools having library'
    //                     },
    //                     {
    //                         value: '% govt aided schools received textbook', label: '% govt aided schools received textbook'
    //                     },
    //                     {
    //                         value: '% schools with Ramp', label: '% schools with Ramp'
    //                     },
    //                 ]
    //             }
    //         }
    //     }
    // },
    udise_metrics: {
        "label": "District Wise Performance",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber1": "select sum(sum) as total_students from datasets.udise_no_of_students_district",
                        "bigNumber2": "select round(cast (avg(sum) as numeric),2) as ptr from datasets.udise_category_district0categoryudise where category_name = 'PTR'",
                        "bigNumber3": "select round(cast (avg(sum) as numeric),2) as schs_with_toilet from datasets.udise_category_district0categoryudise where category_name = '% schools having toilet'",
                        "bigNumber4": "select round(cast (avg(sum) as numeric),2) as schs_having_electricity from datasets.udise_category_district0categoryudise where category_name = '% schools having electricity'",
                        "bigNumber5": "select round(cast (avg(sum) as numeric),2) as schs_having_water from datasets.udise_category_district0categoryudise where category_name = '% schools having drinking water'",
                    },
                    "level": "district"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Total Students', 'PTR', '% schools with toilets', '% schools having electricity', '% schools having drinking water'],
                "valueSuffix": ['', '', '%', '%', '%'],
                "property": ['total_students', 'ptr', 'schs_with_toilet', 'schs_having_electricity', 'schs_having_water']
            }
        }
    },
    state_wise_performance: {
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
                            "map": "select t2.state_name, t1.state_id , t1.category_name,round(cast(sum(t1.sum) as numeric ),2) as percentage from datasets.udise_category_state0categoryudise as t1 join dimensions.state as t2 on t2.state_id = t1.state_id group by t1.state_id, t2.state_name,t1.category_name"
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
                "metricLabelProp": "category_name",
                "metricValueProp": "percentage",
                "groupByColumn": "state_id",
                "metricFilterNeeded": true,
                "legend": { "title": "District Wise Performance" },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "District Name: ",
                        "value": "district_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "",
                        "value": "category_name",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },
}