export const config = {
    scl_stat_total_school: {
        "label": "Total Schools",
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year,sum(count_school_statistics_total_schools) as total_schools from ingestion.Scl_stats_total_schools_by_state where state_id = {state_id} group by state_id",
                        "bigNumberComparison": "select count_school_statistics_total_schools as total_schools from ingestion.Scl_stats_total_schools_by_state where state_id = {state_id} and (academic_year = lastYear)",
                        "table": "select min(academic_year) as min_year,max(academic_year) as max_year, district_name, sum(count_school_statistics_total_schools) as total_schools from (select distinct(district_id), state_id from ingestion.dimension_master) as m join ingestion.Scl_stats_total_schools_by_district as t on m.district_id = t.district_id left join ingestion.dimension_state as s on m.state_id = s.state_id left join ingestion.dimension_district as d on t.district_id = d.district_id where m.state_id = {state_id} group by t.district_id, district_name, state_name",

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
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year,sum(count_school_statistics_total_schools) as total_schools from ingestion.Scl_stats_total_schools_by_district where district_id = {district_id} group by district_id",
                        "bigNumberComparison": "select count_school_statistics_total_schools as total_schools from ingestion.Scl_stats_total_schools_by_district where district_id = {district_id} and (academic_year = lastYear)",
                        "table": "select min(academic_year) as min_year,max(academic_year) as max_year, block_name, sum(count_school_statistics_total_schools) as total_schools from (select distinct(block_id), district_id, state_id from ingestion.dimension_master) as m join ingestion.Scl_stats_total_schools_by_block as t on m.block_id = t.block_id left join ingestion.dimension_state as s on m.state_id = s.state_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = t.block_id where m.district_id = {district_id} group by t.block_id, block_name, district_name, state_name",

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
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year,sum(count_school_statistics_total_schools) as total_schools from ingestion.Scl_stats_total_schools_by_block where block_id = {block_id} group by block_id",
                        "bigNumberComparison": "select count_school_statistics_total_schools as total_schools from ingestion.Scl_stats_total_schools_by_block where block_id = {block_id} and (academic_year = lastYear)",
                        "table": "select min(academic_year) as min_year,max(academic_year) as max_year, cluster_name, sum(count_school_statistics_total_schools) as total_schools from (select distinct(cluster_id), block_id, district_id, state_id from ingestion.dimension_master) as m join ingestion.Scl_stats_total_schools_by_cluster as t on m.cluster_id = t.cluster_id left join ingestion.dimension_state as s on m.state_id = s.state_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id where m.block_id = {block_id} group by t.cluster_id, cluster_name, block_name, district_name, state_name",

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
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year,sum(count_school_statistics_total_schools) as total_schools from ingestion.Scl_stats_total_schools_by_cluster where cluster_id = {cluster_id} group by cluster_id",
                        "bigNumberComparison": "select count_school_statistics_total_schools as total_schools from ingestion.Scl_stats_total_schools_by_cluster where cluster_id = {cluster_id} and (academic_year = lastYear)",
                    },
                    "level": "school"
                }
            },
            
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "State",
                        property: "state_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "District",
                        property: "district_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "Block",
                        property: "block_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "Cluster",
                        property: "cluster_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "Total Schools",
                        property: "total_schools",
                        sticky: true,
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: '#fff'
                    }
                ],
                "sortByProperty": "state_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "property": "total_schools"
            }
        }
    },
    scl_stat_Category_wise_total_schools: {
        "label": "Category Wise Total Schools",
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "barChart": "select min(academic_year) as min_year,max(academic_year) as max_year,district_name as location, school_category,sum(count_category_wise_schools) as category_wise_schools from (select distinct(district_id), state_id from ingestion.dimension_master) as m join ingestion.Scl_stats_cat_wise_schools_by_district as t on m.district_id = t.district_id left join ingestion.dimension_district as d on d.district_id = t.district_id where m.state_id = {state_id} group by t.district_id, district_name ,school_category",
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
                        "barChart": "select min(academic_year) as min_year,max(academic_year) as max_year,block_name as location, school_category,sum(count_category_wise_schools) as category_wise_schools from (select distinct(block_id), district_id from ingestion.dimension_master) as m join ingestion.Scl_stats_cat_wise_schools_by_block as t on m.block_id = t.block_id left join ingestion.dimension_block as d on d.block_id = t.block_id where m.district_id = {district_id} group by t.block_id, block_name ,school_category",
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
                        "barChart": "select min(academic_year) as min_year,max(academic_year) as max_year,cluster_name as location, school_category,sum(count_category_wise_schools) as category_wise_schools from (select distinct(cluster_id), block_id from ingestion.dimension_master) as m join ingestion.Scl_stats_cat_wise_schools_by_cluster as t on m.cluster_id = t.cluster_id left join ingestion.dimension_cluster as d on d.cluster_id = t.cluster_id where m.block_id = {block_id} group by t.cluster_id, cluster_name ,school_category",
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
                        "barChart": "select min(academic_year) as min_year,max(academic_year) as max_year,cluster_name as location, school_category,sum(count_category_wise_schools) as category_wise_schools from (select distinct(cluster_id), block_id from ingestion.dimension_master) as m join ingestion.Scl_stats_cat_wise_schools_by_cluster as t on m.cluster_id = t.cluster_id left join ingestion.dimension_cluster as d on d.cluster_id = t.cluster_id where m.cluster_id = {cluster_id} group by t.cluster_id, cluster_name ,school_category",
                    },
                    "level": "school"
                }
            }
        ],
        "options": {
            "barChart": {
                "isMultibar": true,
                "metricLabelProp": "school_category",
                "metricValueProp": "category_wise_schools",
                "yAxis": {
                    "title": "No Of Schools",
                },
                "xAxis": {
                    "label": "location",
                    "value": "location",
                    "title": "Levels Id",
                    "metrics": [
                        {
                            "label": "primary",
                            "value": "primary"
                        },
                        {
                            "label": "Secondary",
                            "value": "secondary"
                        },
                        {
                            "label": "Senior Secondary",
                            "value": "senior_secondary"
                        },
                        {
                            "label": "Upper Primary",
                            "value": "senior_secondary"
                        },
                    ]
                }
            }
        }
    },
    scl_stat_student_enrolment_wise_number_of_Schools: {
        "label": "Student Enrolment Wise Number of Schools",
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "barChart":"select min(a.academic_year) as min_year,max(a.academic_year) as max_year,b.state_name as location,SUM(CASE WHEN a.sum_total_students_enrolled > 0 AND a.sum_total_students_enrolled <= 50 THEN 1 ELSE 0 END) AS count_0_to_50_students_enrolled,SUM(CASE WHEN a.sum_total_students_enrolled > 50 AND a.sum_total_students_enrolled <= 100 THEN 1 ELSE 0 END) AS count_50_to_100_students_enrolled,SUM(CASE WHEN a.sum_total_students_enrolled > 100 AND a.sum_total_students_enrolled <= 150 THEN 1 ELSE 0 END) AS count_100_to_150_students_enrolled,SUM(CASE WHEN a.sum_total_students_enrolled > 150 AND a.sum_total_students_enrolled <= 200 THEN 1 ELSE 0 END) AS count_150_to_200_students_enrolled,SUM(CASE WHEN a.sum_total_students_enrolled > 200 THEN 1 ELSE 0 END) AS count_200_to_more_students_enrolled from ingestion.Scl_stats_total_enroll_by_state as a  inner join ingestion.dimension_state as b on a.state_id = b.state_id inner join ingestion.Scl_stats_total_schools_by_state as c on b.state_id=c.state_id  where b.state_id={state_id} group by b.state_name, b.state_id "
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
                        "barChart":"select min(a.academic_year) as min_year,max(a.academic_year) as max_year,b.district_name as location,SUM(CASE WHEN a.sum_total_students_enrolled > 0 AND a.sum_total_students_enrolled <= 50 THEN 1 ELSE 0 END) AS count_0_to_50_students_enrolled,SUM(CASE WHEN a.sum_total_students_enrolled > 50 AND a.sum_total_students_enrolled <= 100 THEN 1 ELSE 0 END) AS count_50_to_100_students_enrolled,SUM(CASE WHEN a.sum_total_students_enrolled > 100 AND a.sum_total_students_enrolled <= 150 THEN 1 ELSE 0 END) AS count_100_to_150_students_enrolled,SUM(CASE WHEN a.sum_total_students_enrolled > 150 AND a.sum_total_students_enrolled <= 200 THEN 1 ELSE 0 END) AS count_150_to_200_students_enrolled,SUM(CASE WHEN a.sum_total_students_enrolled > 200 THEN 1 ELSE 0 END) AS count_200_to_more_students_enrolled from ingestion.Scl_stats_total_enroll_by_district as a inner join ingestion.dimension_district as b on a.district_id = b.district_id  inner join ingestion.Scl_stats_total_schools_by_district as c  on b.district_id=c.district_id  where b.district_id={district_id} group by b.district_name, b.district_id,c.count_school_statistics_total_schools"                
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
                        "barChart":"select min(a.academic_year) as min_year,max(a.academic_year) as max_year,b.block_name as location,SUM(CASE WHEN a.sum_total_students_enrolled > 0 AND a.sum_total_students_enrolled <= 50 THEN 1 ELSE 0 END) AS count_0_to_50_students_enrolled,SUM(CASE WHEN a.sum_total_students_enrolled > 50 AND a.sum_total_students_enrolled <= 100 THEN 1 ELSE 0 END) AS count_50_to_100_students_enrolled,SUM(CASE WHEN a.sum_total_students_enrolled > 100 AND a.sum_total_students_enrolled <= 150 THEN 1 ELSE 0 END) AS count_100_to_150_students_enrolled,SUM(CASE WHEN a.sum_total_students_enrolled > 150 AND a.sum_total_students_enrolled <= 200 THEN 1 ELSE 0 END) AS count_150_to_200_students_enrolled,SUM(CASE WHEN a.sum_total_students_enrolled > 200 THEN 1 ELSE 0 END) AS count_200_to_more_students_enrolled from ingestion.Scl_stats_total_enroll_by_block as a inner join ingestion.dimension_block as b on a.block_id = b.block_id inner join ingestion.Scl_stats_total_schools_by_block as c on b.block_id=c.block_id  where c.block_id= {block_id} group by b.block_name, b.block_id,c.count_school_statistics_total_schools                         "                   
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
                        "barChart":"select min(a.academic_year) as min_year,max(a.academic_year) as max_year,b.cluster_name as location,SUM(CASE WHEN a.sum_total_students_enrolled > 0 AND a.sum_total_students_enrolled <= 50 THEN 1 ELSE 0 END) AS count_0_to_50_students_enrolled,SUM(CASE WHEN a.sum_total_students_enrolled > 50 AND a.sum_total_students_enrolled <= 100 THEN 1 ELSE 0 END) AS count_50_to_100_students_enrolled,SUM(CASE WHEN a.sum_total_students_enrolled > 100 AND a.sum_total_students_enrolled <= 150 THEN 1 ELSE 0 END) AS count_100_to_150_students_enrolled,SUM(CASE WHEN a.sum_total_students_enrolled > 150 AND a.sum_total_students_enrolled <= 200 THEN 1 ELSE 0 END) AS count_150_to_200_students_enrolled,SUM(CASE WHEN a.sum_total_students_enrolled > 200 THEN 1 ELSE 0 END) AS count_200_to_more_students_enrolled from ingestion.Scl_stats_total_enroll_by_cluster as a inner join ingestion.dimension_cluster as b on a.cluster_id = b.cluster_id inner join ingestion.Scl_stats_total_schools_by_cluster as c on b.cluster_id=c.cluster_id where b.cluster_id={cluster_id} group by b.cluster_name, b.cluster_id,c.count_school_statistics_total_schools "           
                            },
                    "level": "school"
                }
            }
        ],
        "options": {
            "barChart": {
                "isMultibar": true,
                "metricLabelProp": "school_category",
                "metricValueProp": "category_wise_schools",
                "yAxis": {
                    "title": "Students Enrolled",
                },
                "xAxis": {
                    "label": "location",
                    "value": "location",
                    "title": "Levels Id",
                    "metrics": [
                        {
                            "label": "0-50",
                            "value": "count_0_to_50_students_enrolled"
                        },
                        {
                            "label": "50-100",
                            "value": "count_50_to_100_students_enrolled"
                        },
                        {
                            "label": "100-150",
                            "value": "count_100_to_150_students_enrolled"
                        },
                        {
                            "label": "150-200",
                            "value": "count_150_to_200_students_enrolled"
                        },
                        {
                            "label": "200+ students",
                            "value": "count_200_to_more_students_enrolled"
                        },
                    ]
                }
            }
        }
    }
}