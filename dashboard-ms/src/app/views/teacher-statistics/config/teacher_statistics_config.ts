export const config = {
    ts_stat_total_teachers: {
        "label": "Total Teachers",
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "table": "select min(academic_year) as min_year,max(academic_year) as max_year, district_name, sum(sum_total_teachers) as total_teachers from (select distinct(district_id), state_id from ingestion.dimension_master) as m join ingestion.Scl_stats_total_tchs_by_district as t on m.district_id = t.district_id left join ingestion.dimension_state as s on m.state_id = s.state_id left join ingestion.dimension_district as d on t.district_id = d.district_id where m.state_id = {state_id} group by t.district_id, district_name, state_name",
                        "bigNumberComparison": "select sum_total_teachers as total_teachers from ingestion.Scl_stats_total_tchs_by_state where state_id = {state_id} and (academic_year = lastYear)",
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year ,sum(sum_total_teachers) as total_teachers from ingestion.Scl_stats_total_tchs_by_state where state_id = {state_id} group by state_id",
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
                        "table": "select min(academic_year) as min_year,max(academic_year) as max_year,  block_name, sum(sum_total_teachers) as total_teachers from (select distinct(block_id), district_id, state_id from ingestion.dimension_master) as m join ingestion.Scl_stats_total_tchs_by_block as t on m.block_id = t.block_id left join ingestion.dimension_state as s on m.state_id = s.state_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = t.block_id where m.district_id = {district_id} group by t.block_id, block_name, district_name, state_name",
                        "bigNumberComparison": "select sum_total_teachers as total_teachers from ingestion.Scl_stats_total_tchs_by_district where district_id = {district_id} and (academic_year = lastYear)",
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year ,sum(sum_total_teachers) as total_teachers from ingestion.Scl_stats_total_tchs_by_district where district_id = {district_id} group by district_id",
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
                        "table": "select min(academic_year) as min_year,max(academic_year) as max_year, cluster_name, sum(sum_total_teachers) as total_teachers from (select distinct(cluster_id), block_id, district_id, state_id from ingestion.dimension_master) as m join ingestion.Scl_stats_total_tchs_by_cluster as t on m.cluster_id = t.cluster_id left join ingestion.dimension_state as s on m.state_id = s.state_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id where m.block_id = {block_id} group by t.cluster_id, cluster_name, block_name, district_name, state_name",
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year ,sum(sum_total_teachers) as total_teachers from ingestion.Scl_stats_total_tchs_by_block where block_id = {block_id} group by block_id",
                        "bigNumberComparison": "select sum_total_teachers as total_teachers from ingestion.Scl_stats_total_tchs_by_block where block_id = {block_id} and (academic_year = lastYear)",

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
                        "table": "select min(academic_year) as min_year,max(academic_year) as max_year, school_name, sum(sum_total_teachers) as total_teachers from (select distinct(school_id), cluster_id, block_id, district_id, state_id from ingestion.dimension_master) as m join ingestion.Scl_stats_total_tchs_by_school as t on m.school_id = t.school_id left join ingestion.dimension_state as s on m.state_id = s.state_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on m.cluster_id = c.cluster_id left join ingestion.dimension_school as sc on sc.school_id = t.school_id where m.cluster_id = {cluster_id} group by t.school_id, school_name, cluster_name, block_name, district_name, state_name",
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year ,sum(sum_total_teachers) as total_teachers from ingestion.Scl_stats_total_tchs_by_cluster where cluster_id = {cluster_id} group by cluster_id",
                        "bigNumberComparison": "select sum_total_teachers as total_teachers from ingestion.Scl_stats_total_tchs_by_cluster where cluster_id = {cluster_id} and (academic_year = lastYear)",

                    },
                    "level": "school"
                }
            },
            {
                "name": "School",
                "labelProp": "school_name",
                "valueProp": "school_id",
                "hierarchyLevel": "5",
                "actions": {
                    "queries": {
                        "table": "select min(academic_year) as min_year,max(academic_year) as max_year, school_name, t.grade,sum(sum_total_teachers) as total_teachers  from (select distinct(school_id), cluster_id, block_id, district_id, state_id from ingestion.dimension_master) as m join ingestion.Scl_stats_total_tchs_by_grade as t on m.school_id = t.school_id left join ingestion.dimension_state as s on m.state_id = s.state_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on m.cluster_id = c.cluster_id left join ingestion.dimension_school as sc on sc.school_id = t.school_id where t.school_id = {school_id} group by t.grade, school_name, cluster_name, block_name, district_name, state_name",
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year ,sum(sum_total_teachers) as total_teachers from ingestion.Scl_stats_total_tchs_by_school where school_id = {school_id} group by school_id",
                        "bigNumberComparison": "select sum_total_teachers as total_teachers from ingestion.Scl_stats_total_tchs_by_school where school_id = {school_id} and (academic_year = lastYear)",
                    },
                    "level": "grade"
                } 
            }
            
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
                        name: "Total Teachers",
                        property: "total_teachers",
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
                "property": "total_teachers"
                }
        }
    },
    ts_stat_category_wise_total_teachers: {
        "label": "Category Wise Total Teachers",
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "barChart": "select district_name as location,t.school_category, sum(sum_total_teachers) as total_teachers from (select distinct(district_id), state_id from ingestion.dimension_master) as m join ingestion.scl_stats_grade_wise_tchs_by_district as t on m.district_id = t.district_id left join ingestion.dimension_district as d on t.district_id = d.district_id where m.state_id = {state_id} group by t.district_id, district_name, t.school_category",
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
                        "barChart": "select block_name as location,t.school_category, sum(sum_total_teachers) as total_teachers from (select distinct(block_id), district_id from ingestion.dimension_master) as m join ingestion.scl_stats_grade_wise_tchs_by_block as t on m.block_id = t.block_id left join ingestion.dimension_block as d on t.block_id = d.block_id where m.district_id = {district_id} group by t.block_id, block_name, t.school_category",
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
                        "barChart": "select cluster_name as location,t.school_category, sum(sum_total_teachers) as total_teachers from (select distinct(cluster_id), block_id from ingestion.dimension_master) as m join ingestion.scl_stats_grade_wise_tchs_by_cluster as t on m.cluster_id = t.cluster_id left join ingestion.dimension_cluster as d on t.cluster_id = d.cluster_id where m.block_id = {block_id} group by t.cluster_id, cluster_name, t.school_category",
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
                        "barChart": "select school_name as location,t.school_category, sum(sum_total_teachers) as total_teachers from (select distinct(school_id), cluster_id from ingestion.dimension_master) as m join ingestion.scl_stats_grade_wise_tchs_by_school as t on t.school_id = m.school_id left join ingestion.dimension_school as d on t.school_id = d.school_id where m.cluster_id = {cluster_id} group by t.school_id, school_name, t.school_category",
                    },
                    "level": "school"
                }
            }
        ],
        "options": {
            "barChart": {
                "isMultibar": true,
                "metricLabelProp": "school_category",
                "metricValueProp": "total_teachers",
                "yAxis": {
                    "title": "Total Teachers"
                },
                "xAxis": {
                    "title": "Levels Id",
                    "label": "location",
                    "value": "location",
                    "metrics": [
                        {
                            "label": "Primary",
                            "value": "primary"
                        },
                        {
                            "label": "Upper_Primary",
                            "value": "upper_primary"
                        },
                        {
                            "label": "Secondary",
                            "value": "senior_secondary"
                        },
                        {
                            "label": "Senior Secondary",
                            "value": "senior_secondary"
                        }
                    ]
                }
            }
        }
    },
    ts_stat_category_wise_average_pupil_total_teachers_ratio: {
        "label": "Category Wise Average Pupil Teacher Ratio",
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "barChart": "select min(academic_year) as min_year,max(academic_year) as max_year, district_name as location,t.school_category, round(avg(sum_students_enrolled/sum_total_teachers),2) as total_teachers from (select distinct(district_id), state_id from ingestion.dimension_master) as m join ingestion.scl_stats_grade_wise_avg_pupil_tch_ratio_by_district as t on m.district_id = t.district_id left join ingestion.dimension_district as d on t.district_id = d.district_id where m.state_id = {state_id} group by t.district_id, district_name, t.school_category",                    },
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
                        "barChart": "select min(academic_year) as min_year,max(academic_year) as max_year,block_name as location,t.school_category, round(avg(sum_students_enrolled/sum_total_teachers),2) as total_teachers from (select distinct(block_id), district_id from ingestion.dimension_master) as m join ingestion.scl_stats_grade_wise_avg_pupil_tch_ratio_by_block as t on m.block_id = t.block_id left join ingestion.dimension_block as d on t.block_id = d.block_id where m.district_id = {district_id} group by t.block_id, block_name, t.school_category",                    },
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
                        "barChart": "select min(academic_year) as min_year,max(academic_year) as max_year,cluster_name as location,t.school_category, round(avg(sum_students_enrolled/sum_total_teachers),2) as total_teachers from (select distinct(cluster_id), block_id from ingestion.dimension_master) as m join ingestion.scl_stats_grade_wise_avg_pupil_tch_ratio_by_cluster as t on m.cluster_id = t.cluster_id left join ingestion.dimension_cluster as d on t.cluster_id = d.cluster_id where m.block_id = {block_id} group by t.cluster_id, cluster_name, t.school_category",                    },
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
                        "barChart": "select min(academic_year) as min_year,max(academic_year) as max_year, school_name as location,t.school_category, round(avg(sum_students_enrolled/sum_total_teachers),2) as total_teachers from (select distinct(school_id), cluster_id from ingestion.dimension_master) as m join ingestion.scl_stats_grade_wise_avg_pupil_tch_ratio_by_school as t on t.school_id = m.school_id left join ingestion.dimension_school as d on t.school_id = d.school_id where m.cluster_id = {cluster_id} group by t.school_id, school_name, t.school_category",                    },
                    "level": "school"
                }
            }
        ],
        "options": {
            "barChart": {
                "isMultibar": true,
                "metricLabelProp": "school_category",
                "metricValueProp": "total_teachers",
                "yAxis": {
                    "title": "Avg Total Teachers"
                },
                "xAxis": {
                    "title": "Levels Id",
                    "label": "location",
                    "value": "location",
                    "metrics": [
                        {
                            "label": "Primary",
                            "value": "primary"
                        },
                        {
                            "label": "Upper_Primary",
                            "value": "upper_primary"
                        },
                        {
                            "label": "Secondary",
                            "value": "senior_secondary"
                        },
                        {
                            "label": "Senior Secondary",
                            "value": "senior_secondary"
                        }
                    ]
                }
            }
        }
    },
    ts_stat_average_pupil_teacher_ratio: {
        "label": "Average Pupil Teacher Ratio",
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "table": "select min(academic_year) as min_year,max(academic_year) as max_year, district_name ,round(avg(sum_students_enrolled /sum_total_teachers ),0) as pupil_teacher_ratio  from (select distinct(district_id), state_id from ingestion.dimension_master) as m join ingestion.scl_stats_avg_pupil_tch_ratio_by_district as t on m.district_id = t.district_id left join ingestion.dimension_state as s on m.state_id = s.state_id left join ingestion.dimension_district as d on t.district_id = d.district_id where m.state_id = {state_id} group by t.district_id, district_name, state_name",
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year,round(avg(sum_students_enrolled /sum_total_teachers ),2) as pupil_teacher_ratio from ingestion.scl_stats_avg_pupil_tch_ratio_by_state where state_id = {state_id}",
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
                        "table": "select min(academic_year) as min_year,max(academic_year) as max_year, block_name, round(avg(sum_students_enrolled /sum_total_teachers ),0) as pupil_teacher_ratio from (select distinct(block_id), district_id, state_id from ingestion.dimension_master) as m join ingestion.scl_stats_avg_pupil_tch_ratio_by_block as t on m.block_id = t.block_id left join ingestion.dimension_state as s on m.state_id = s.state_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = t.block_id where m.district_id = {district_id} group by t.block_id, block_name, district_name, state_name",
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year,round(avg(sum_students_enrolled /sum_total_teachers ),2) as pupil_teacher_ratio from ingestion.scl_stats_avg_pupil_tch_ratio_by_district where district_id = {district_id}",
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
                        "table": "select min(academic_year) as min_year,max(academic_year) as max_year, cluster_name, round(avg(sum_students_enrolled /sum_total_teachers ),0) as pupil_teacher_ratio from (select distinct(cluster_id), block_id, district_id, state_id from ingestion.dimension_master) as m join ingestion.scl_stats_avg_pupil_tch_ratio_by_cluster as t on m.cluster_id = t.cluster_id left join ingestion.dimension_state as s on m.state_id = s.state_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id where m.block_id = {block_id} group by t.cluster_id, cluster_name, block_name, district_name, state_name",
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year, round(avg(sum_students_enrolled /sum_total_teachers ),2) as pupil_teacher_ratio from ingestion.scl_stats_avg_pupil_tch_ratio_by_block where block_id = {block_id}",

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
                        "table": "select min(academic_year) as min_year,max(academic_year) as max_year, school_name, round(avg(sum_students_enrolled /sum_total_teachers ),0) as pupil_teacher_ratio from (select distinct(school_id), cluster_id, block_id, district_id, state_id from ingestion.dimension_master) as m join ingestion.scl_stats_avg_pupil_tch_ratio_by_school as t on m.school_id = t.school_id left join ingestion.dimension_state as s on m.state_id = s.state_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on m.cluster_id = c.cluster_id left join ingestion.dimension_school as sc on sc.school_id = t.school_id where m.cluster_id = {cluster_id} group by t.school_id, school_name, cluster_name, block_name, district_name, state_name",
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year,round(avg(sum_students_enrolled /sum_total_teachers ),2) as pupil_teacher_ratio from ingestion.scl_stats_avg_pupil_tch_ratio_by_cluster where cluster_id = {cluster_id}",
                    },
                    "level": "school"
                }
            },
            {
                "name": "School",
                "labelProp": "school_name",
                "valueProp": "school_id",
                "hierarchyLevel": "5",
                "actions": {
                    "queries": {
                        "table": "select min(academic_year) as min_year,max(academic_year) as max_year, school_name, t.grade, round(avg(sum_students_enrolled /sum_total_teachers ),0) as pupil_teacher_ratio from (select distinct(school_id), cluster_id, block_id, district_id, state_id from ingestion.dimension_master) as m join ingestion.scl_stats_avg_pupil_tch_ratio_by_grade as t on m.school_id = t.school_id left join ingestion.dimension_state as s on m.state_id = s.state_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on m.cluster_id = c.cluster_id left join ingestion.dimension_school as sc on sc.school_id = t.school_id where t.school_id = {school_id} group by t.grade, school_name, cluster_name, block_name, district_name, state_name",
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year,round(avg(sum_students_enrolled /sum_total_teachers ),2) as pupil_teacher_ratio from ingestion.scl_stats_avg_pupil_tch_ratio_by_school where school_id = {school_id}",
                    },
                    "level": "grade"
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
                        name: "School",
                        property: "school_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "Average Pupil Teacher Ratio",
                        property: "pupil_teacher_ratio",
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
            
            }
        }
    },
    ts_stat_rank_in_average_pupil_teacher_ratio: {
        "label": "Rank in Average Pupil-Teacher Ratio",
        "defaultLevel": "district",
        "filters": [
            {
                "name": "District",
                "labelProp": "district_name",
                "valueProp": "district_id",
                "hierarchyLevel": "2",
                "actions": {
                    "queries": {
                        "table": "select min(academic_year) as min_year,max(academic_year) as max_year,district_name, dense_rank() over(order by sum(sum_total_teachers) desc) as teachers_rank from ingestion.scl_stats_avg_pupil_tch_ratio_by_district as t left join ingestion.dimension_district as d on t.district_id = d.district_id left join (select distinct(district_id), state_id from ingestion.dimension_master) as m on m.district_id = t.district_id where state_id = {state_id} group by t.district_id, district_name",
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
                        "table": "select min(academic_year) as min_year,max(academic_year) as max_year,block_name, dense_rank() over(order by sum(sum_total_teachers) desc) as teachers_rank from ingestion.scl_stats_avg_pupil_tch_ratio_by_block as t left join ingestion.dimension_block as b on t.block_id = b.block_id left join (select distinct(block_id), district_id from ingestion.dimension_master) as m on m.block_id = t.block_id where district_id = {district_id} group by t.block_id, block_name",
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
                        "table": "select min(academic_year) as min_year,max(academic_year) as max_year,cluster_name, dense_rank() over(order by sum(sum_total_teachers) desc) as teachers_rank from ingestion.scl_stats_avg_pupil_tch_ratio_by_cluster as t left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join (select distinct(cluster_id), block_id from ingestion.dimension_master) as m on m.cluster_id = t.cluster_id where block_id = {block_id} group by t.cluster_id, cluster_name",
                    },
                    "level": "school"
                }
            },
            {
                "name": "School",
                "labelProp": "school_name",
                "valueProp": "school_id",
                "hierarchyLevel": "5",
                "actions": {
                    "queries": {
                        "table": "select min(academic_year) as min_year,max(academic_year) as max_year,school_name,dense_rank() over(order by sum(sum_total_teachers) desc) as teachers_rank from ingestion.scl_stats_avg_pupil_tch_ratio_by_school as t left join ingestion.dimension_school as s on t.school_id = s.school_id left join (select distinct(school_id), cluster_id from ingestion.dimension_master) as m on m.school_id = t.school_id where cluster_id = {cluster_id} group by t.school_id, school_name",
                    },
                    "level": "class"
                }
            },
            {
                "name": "Grade",
                "labelProp": "grade",
                "valueProp": "grade",
                "hierarchyLevel": "6",
                "actions": {
                    "queries": {
                        "table": "select min(academic_year) as min_year,max(academic_year) as max_year,grade, dense_rank() over(order by sum(sum_cwsn_enrolled) desc) as cwsn_enrolled_rank, dense_rank() over(order by sum(sum_total_students_enrolled) desc) as students_enrolled_rank from ingestion.scl_stats_cwsn_enroll_by_class as t where t.school_id = {school_id} group by grade, t.school_id",
                    },
                    "level": "class"
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
                        name: "Rank in Average Pupil-Teacher Ratio",
                        property: "teachers_rank",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: '#fff'
                    },
                   
                ],
            }
        }
    },
}