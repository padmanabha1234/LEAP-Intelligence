export const config = {
    filters: [
        {
            "label": "Improvements Status",
            "name": "Metric",
            "id": "metric",
            "labelProp": "category_name",
            "valueProp": "category_name",
            "query": "SELECT category_name FROM dimensions.categorymicro ORDER BY id ASC "
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
                        "map": "select t.state_id,state_name ,t.status from dimensions.state as d join (select state_id , case when sum > 0 then 'YES' else 'NO' end as status from datasets.micro_improvements_started_state) as t on  d.state_id = t.state_id order by d.state_name asc"
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
                    "title": "Started Doing Micro-Improvement"
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/ UT Name :",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Participating in Micro-Improvement Program :",
                        "value": "status",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },

    improvements_status: {
        "label": "Improvements Status",
        "filters":
            [
                {
                    "name": "National",
                    "hierarchyLevel": "0",
                    "actions":
                    {
                        "queries":
                        {
                            "map":"select t.state_id,state_name,category_name,sum(sum) as performance from datasets.micro_improvements_categorymicro_state0categorymicro as t join dimensions.state as t2 on t.state_id=t2.state_id group by t.state_id,state_name,category_name"
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
                    "indicatorType": "",
                    "metricLabelProp": "category_name",
                    "metricValueProp": "performance",
                    "groupByColumn": "state_id",
                    "metricFilterNeeded": true,
                    "legend": { "title": "Improvements" },
                    "tooltipMetrics": [
                        {
                            "valuePrefix": "State Name: ",
                            "value": "state_name",
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
    }
}

