export const config = {
    filters: [
        {
            "label": "District Wise Performance",
            "name": "Metric",
            "labelProp": "category_name",
            "valueProp": "category_name",
            "id": "metric",
            "query": "select category_name from dimensions.categorypm"
        },
    ],
    progress_status:
    {
        "label": "Progress Status",
        "filters":
            [
                {
                    "name": "State",
                    "hierarchyLevel": "1",
                    "actions": {
                        "queries":
                        {
                            "map": "select category_name as category_name,t2.district_name,t1.district_id, cast(sum(t1.sum) as numeric) as total_count FROM datasets.pm_poshan_category_a3pbqhlja3gcngavrayg as t1 join dimensions.district as t2 on t1.district_id = t2.district_id group by t1.district_id,t2.district_name, category_name"
                        },
                        "level": "district",
                        "nextLevel": "block"
                    }
                }
            ],
        "options":
        {
            "map": {
                "metricLabelProp": "category_name",
                "metricValueProp": "total_count",
                "groupByColumn": "district_id",
                "metricFilterNeeded": true,
                "legend": { "title": "Progress Status" },
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
    pmposhan_metrics: {
        "label": "Progress Status",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber1": "select count(distinct(district_id)) as total_districts from datasets.pm_poshan_total_meals_served_daily_district",
                        "bigNumber2": "select sum(sum) as total_schools from datasets.pm_poshan_category_value_categorypm where category_name = 'Total Schools'",
                        "bigNumber3": "select sum(sum) as total_meals_served from datasets.pm_poshan_total_meals_served_daily_district",
                        "bigNumber4": "",
                        "bigNumber5": "",
                    },
                    "level": "district"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Total Districts','Total Schools','Total Meals Served','% Schools meals served (Reported)','% Meals served (Reported)'],
                "valueSuffix": ['','','','%','%'],
                "property": ['total_districts','total_schools','total_meals_served','percentage_schools_meals_served','percentage_meals_served']
            }
        }
    }
}
