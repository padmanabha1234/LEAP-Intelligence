export const config = {
    filters: [
        {
            "label": "Availability",
            "name": "Machine",
            "labelProp": "machine",
            "valueProp": "machine",
            "id": "machine",
            "tableAlias": "t1",
            "query": "select machine from dimensions.machine"
        },
        {
            "label": "Availability",
            "name": "Shift",
            "labelProp": "shift",
            "valueProp": "shift",
            "id": "shift",
            "tableAlias": "t1",
            "query": "select shift from dimensions.shift"
        },

    ],

    leap_OEE_bignumber: {
        "label": "Availability",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber": "SELECT CAST((t1.availability * t2.performance * t3.quality) / 10000 AS numeric(10, 2)) AS oee FROM( SELECT AVG(t1.sum / t2.sum) * 100 AS availability FROM datasets.leap_actual_production_time_daily_machine0shift AS t1 JOIN datasets.leap_planned_production_time_daily_machine0shift AS t2 ON t1.machine = t2.machine) AS t1, ( SELECT AVG((t1.sum - t2.sum) / t1.sum) * 100 AS performance FROM datasets.leap_actual_production_time_daily_machine0shift AS t1 JOIN datasets.leap_total_down_time_daily_machine0shift AS t2 ON t1.machine = t2.machine ) AS t2, ( SELECT AVG(CASE WHEN t2.sum <> 0 AND t1.sum IS NOT NULL AND t2.sum IS NOT NULL AND NOT t1.sum = 'NaN' AND NOT t2.sum = 'NaN' THEN t1.sum / t2.sum ELSE 0 END) * 100 AS quality FROM datasets.leap_total_good_units_daily_machine0shift AS t1 JOIN datasets.leap_total_produced_units_daily_machine0shift AS t2 ON t1.machine = t2.machine ) AS t3",
                    },
                    "level": "district"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Overall Equipment Efficiency'],
                "valueSuffix": ['%'],
                "property": ['oee']
            }
        }
    },

    leap_availability: {
        "label": "Availability",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber": "select CASE WHEN AVG(t1.sum / t2.sum) IS NULL THEN 0 ELSE CAST(AVG(t1.sum / t2.sum) * 100 AS numeric(10, 2)) END AS availability from datasets.leap_actual_production_time_daily_machine0shift as t1 join datasets.leap_planned_production_time_daily_machine0shift as t2 on t1.machine = t2.machine and t1.shift=t2.shift and t1.date=t2.date where t1.date between startDate and endDate",
                    },
                    "level": "district"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Availability'],
                "valueSuffix": ['%'],
                "property": ['availability']
            }
        }
    },

    leap_performance: {
        "label": "Availability",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber": "select CASE WHEN AVG((t1.sum - t2.sum) / t1.sum) IS NULL THEN 0 ELSE CAST(AVG((t1.sum - t2.sum) / t1.sum) * 100 AS numeric(10, 2)) END AS performance from datasets.leap_actual_production_time_daily_machine0shift as t1 join datasets.leap_total_down_time_daily_machine0shift as t2 on t1.machine = t2.machine and t1.shift=t2.shift and t1.date=t2.date where t1.date between startDate and endDate",
                    },
                    "level": "district"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Performance'],
                "valueSuffix": ['%'],
                "property": ['performance']
            }
        }
    },

    leap_quality: {
        "label": "Availability",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber": "select CASE WHEN AVG(t1.sum / t2.sum) IS NULL THEN 0 ELSE CAST(AVG(t1.sum / t2.sum) * 100 AS numeric(10, 2)) END AS quality from datasets.leap_total_good_units_daily_machine0shift as t1 join datasets.leap_total_produced_units_daily_machine0shift as t2 on t1.machine = t2.machine and t1.shift=t2.shift and t1.date=t2.date where t1.date between startDate and endDate",
                    },
                    "level": "district"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Quality'],
                "valueSuffix": ['%'],
                "property": ['quality']
            }
        }
    },

    leap_alerts: {
        "label": "Alerts",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
            }]
    },




}