export const config = {
    filters:[
        {
            "name": "Academic Year",
            "id": "academicYear",
            "labelProp": "academicyear",
            "valueProp": "academicyear_id",
            "query": "select academicyear_id, academicyear from dimensions.academicyear"
        },
        {
            "name": "Month",
            "labelProp": "month_name",
            "valueProp": "month",
            "id": "month",
            "query": "select distinct(month) , case when month = 1 then 'January' when month = 2 then 'February' when month = 3 then 'March' when month = 4 then 'April' when month = 5 then 'May' when month = 6 then 'June' when month = 7 then 'July' when month = 8 then 'August' when month = 9 then 'September' when month = 10 then 'October' when month = 11 then 'November' when month = 12 then 'December' end as month_name from datasets.rev_and_monitoring_district_monthly_academicyear0district",
        }
    ],
    review_meetings_conducted: {
        "label": "Review Meetings",
        "filters": [
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "table": "select district_name, (avg * 100) as avg from dimensions.district as d join datasets.rev_and_monitoring_district_monthly_academicyear0district as t on t.district_id = d.district_id ORDER BY avg ASC",
                    },
                    "level": "district",
                    "nextLevel": "block"
                }
            },
            {
                "name": "District",
                "hierarchyLevel": "2",
                "actions": {
                    "queries": {
                        "table": "select block_name, (avg * 100) as avg from dimensions.block as b join datasets.rev_and_monitoring_block_monthly_academicyear0block as t on t.block_id = b.block_id where b.district_id = {district_id} ORDER BY avg ASC",
                    },
                    "level": "block",
                    "nextLevel": "cluster"
                }
            }
        ],
        "options": {
            "table": {
                "valueSuffix": '%',
                "columns": [
                    {
                        name: "State",
                        property: "state_name",
                        class: "text-center"
                    },
                    {
                        name: "District",
                        property: "district_name",
                        class: "text-center"
                    },
                    {
                        name: "Block",
                        property: "block_name",
                        class: "text-center"
                    },
                    {
                        name: "Cluster",
                        property: "cluster_name",
                        class: "text-center"
                    },
                    {
                        name: "School",
                        property: "school_name",
                        class: "text-center"
                    },
                    {
                        name: "Grade",
                        property: "grade",
                        class: "text-center"
                    },
                    {
                        name: "Review Meetings Conducted",
                        property: "avg",
                        class: "text-center",
                        isHeatMapRequired: true,
                        valueSuffix: '%',
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
            }
        }
    },
    review_meetings_status: {
        "label": "Review Meetings",
        "filters": [
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "table": "select district_name, t.review_status from dimensions.district as d join (select district_id, academicyear_id, month, case when sum > 0 then 'YES' else 'NO' end as review_status from datasets.rev_and_monitoring_district_monthly_academicyear0district ) as t on d.district_id = t.district_id order by d.district_name asc",
                    },
                    "level": "district"
                }
            },
            {
                "name": "District",
                "hierarchyLevel": "2",
                "actions": {
                    "queries": {
                        "table": "select block_name, t.review_status from dimensions.block as b join (select block_id,academicyear_id, month, case when sum > 0 then 'YES' else 'NO' end as review_status from datasets.rev_and_monitoring_block_monthly_academicyear0block ) as t on b.block_id = t.block_id where b.district_id = {district_id} order by b.block_name asc"
                    },
                    "level": "block"
                }
            },
            {
                "name": "Block",
                "hierarchyLevel": "3",
                "actions": {
                    "queries": {
                        "table": "select cluster_name, t.review_status from dimensions.cluster as c join (select cluster_id, academicyear_id,month, case when sum > 0 then 'YES' else 'NO' end as review_status from datasets.rev_and_monitoring_cluster_monthly_academicyear0cluster ) as t on c.cluster_id = t.cluster_id where c.block_id = {block_id} order by c.cluster_name asc"
                    },
                    "level": "cluster"
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "State",
                        property: "state_name",
                        class: "text-center"
                    },
                    {
                        name: "District",
                        property: "district_name",
                        class: "text-center"
                    },
                    {
                        name: "Block",
                        property: "block_name",
                        class: "text-center"
                    },
                    {
                        name: "Cluster",
                        property: "cluster_name",
                        class: "text-center"
                    },
                    {
                        name: "School",
                        property: "school_name",
                        class: "text-center"
                    },
                    {
                        name: "Grade",
                        property: "grade",
                        class: "text-center"
                    },
                    {
                        name: "Review Meeting Status",
                        property: "review_status",
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
                "sortByProperty": "state_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
            }
        }
    },
    review_meetings_conducted_bignumber: {
        "label": "Review Meetings",
        "filters": [
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber": "select ceil(round(CAST(avg(avg)*100 as numeric),2)) as percentage from datasets.rev_and_monitoring_district_monthly_academicyear0district",
                    },
                    "level": "district"
                }
            },
            {
                "name": "District",
                "hierarchyLevel": "2",
                "actions": {
                    "queries": {
                        "bigNumber": "select ceil(round(CAST(avg(avg)*100 as numeric),2)) as percentage from dimensions.block as b join datasets.rev_and_monitoring_block_monthly_academicyear0block as t on t.block_id = b.block_id where district_id = {district_id}",
                    },
                    "level": "block"
                }
            },
            {
                "name": "Block",
                "hierarchyLevel": "3",
                "actions": {
                    "queries": {
                        "bigNumber": "select ceil(round(CAST(avg(avg)*100 as numeric),2)) as percentage from dimensions.cluster as c join datasets.rev_and_monitoring_cluster_monthly_academicyear0cluster as t on c.cluster_id = t.cluster_id where block_id = {block_id}",
                    },
                    "level": "cluster"
                }
            }
        ],
        "options": {
            "bigNumber": {
                "title": "Average Review Meetings Conducted",
                "valueSuffix": '%',
                "property": 'percentage'
            }
        }
    }
}

