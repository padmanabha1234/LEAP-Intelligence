export const config = {
    students_enrolled_and_cwsn_enrollment: {
        "label": "Student Statistics",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "table": "select min(academic_year) as min_year,max(academic_year) as max_year, district_name, sum(sum_cwsn_enrolled) as cwsn_enrolled, round(avg(percentage), 0) as cwsn_enrollment from (select distinct(district_id), state_id from ingestion.dimension_master) as m join ingestion.scl_stats_cwsn_enroll_by_district as t on m.district_id = t.district_id left join ingestion.dimension_state as s on m.state_id = s.state_id left join ingestion.dimension_district as d on t.district_id = d.district_id where m.state_id = {state_id} group by t.district_id, district_name, state_name",
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year,round(avg(percentage), 2) as cwsn_enrollment from ingestion.scl_stats_cwsn_enroll_by_state where state_id = {state_id} group by state_id",
                        "bigNumberComparison": "select round(avg(percentage), 2) as cwsn_enrollment from ingestion.scl_stats_cwsn_enroll_by_state where state_id = {state_id} and (academic_year = lastYear)"
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
                        "table": "select min(academic_year) as min_year,max(academic_year) as max_year, block_name, sum(sum_cwsn_enrolled) as cwsn_enrolled, round(avg(percentage), 0) as cwsn_enrollment from (select distinct(block_id), district_id, state_id from ingestion.dimension_master) as m join ingestion.scl_stats_cwsn_enroll_by_block as t on m.block_id = t.block_id left join ingestion.dimension_state as s on m.state_id = s.state_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = t.block_id where m.district_id = {district_id} group by t.block_id, block_name, district_name, state_name",
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year,round(avg(percentage), 2) as cwsn_enrollment from ingestion.scl_stats_cwsn_enroll_by_district where district_id = {district_id} group by district_id",
                        "bigNumberComparison": "select round(avg(percentage), 2) as cwsn_enrollment from ingestion.scl_stats_cwsn_enroll_by_district where district_id = {district_id} and (academic_year = lastYear)"
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
                        "table": "select min(academic_year) as min_year,max(academic_year) as max_year, cluster_name, sum(sum_cwsn_enrolled) as cwsn_enrolled, round(avg(percentage), 0) as cwsn_enrollment from (select distinct(cluster_id), block_id, district_id, state_id from ingestion.dimension_master) as m join ingestion.scl_stats_cwsn_enroll_by_cluster as t on m.cluster_id = t.cluster_id left join ingestion.dimension_state as s on m.state_id = s.state_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id where m.block_id = {block_id} group by t.cluster_id, cluster_name, block_name, district_name, state_name",
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year,round(avg(percentage), 2) as cwsn_enrollment from ingestion.scl_stats_cwsn_enroll_by_block where block_id = {block_id} group by block_id",
                        "bigNumberComparison": "select round(avg(percentage), 2) as cwsn_enrollment from ingestion.scl_stats_cwsn_enroll_by_block where block_id = {block_id} and (academic_year = lastYear)"

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
                        "table": "select min(academic_year) as min_year,max(academic_year) as max_year, school_name, sum(sum_cwsn_enrolled) as cwsn_enrolled, round(avg(percentage), 0) as cwsn_enrollment from (select distinct(school_id), cluster_id, block_id, district_id, state_id from ingestion.dimension_master) as m join ingestion.scl_stats_cwsn_enroll_by_school as t on m.school_id = t.school_id left join ingestion.dimension_state as s on m.state_id = s.state_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on m.cluster_id = c.cluster_id left join ingestion.dimension_school as sc on sc.school_id = t.school_id where m.cluster_id = {cluster_id} group by t.school_id, school_name, cluster_name, block_name, district_name, state_name",
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year,round(avg(percentage), 2) as cwsn_enrollment from ingestion.scl_stats_cwsn_enroll_by_cluster where cluster_id = {cluster_id} group by cluster_id",
                        "bigNumberComparison": "select round(avg(percentage), 2) as cwsn_enrollment from ingestion.scl_stats_cwsn_enroll_by_cluster where cluster_id = {cluster_id} and (academic_year = lastYear)"
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
                        "table": "select min(academic_year) as min_year,max(academic_year) as max_year, school_name, t.grade, sum(sum_cwsn_enrolled) as cwsn_enrolled, round(avg(percentage), 0) as cwsn_enrollment from (select distinct(school_id), cluster_id, block_id, district_id, state_id from ingestion.dimension_master) as m join ingestion.scl_stats_cwsn_enroll_by_grade as t on m.school_id = t.school_id left join ingestion.dimension_state as s on m.state_id = s.state_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on m.cluster_id = c.cluster_id left join ingestion.dimension_school as sc on sc.school_id = t.school_id where t.school_id = {school_id} group by t.grade, school_name, cluster_name, block_name, district_name, state_name",
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year,round(avg(percentage), 2) as cwsn_enrollment from ingestion.scl_stats_cwsn_enroll_by_school where school_id = {school_id} group by school_id",
                        "bigNumberComparison": "select round(avg(percentage), 2) as cwsn_enrollment from ingestion.scl_stats_cwsn_enroll_by_school where school_id = {school_id} and (academic_year = lastYear)"
                    },
                    "level": "grade"
                }
            },
            {
                "name": "Class",
                "labelProp": "grade",
                "valueProp": "grade",
                "hierarchyLevel": "6",
                "actions": {
                    "queries": {
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year,round(avg(percentage), 2) as cwsn_enrollment from ingestion.scl_stats_cwsn_enroll_by_grade where grade = {class_id} group by grade",
                        "bigNumberComparison": "select min(academic_year) as min_year,max(academic_year) as max_year,round(avg(percentage), 2) as cwsn_enrollment from ingestion.scl_stats_cwsn_enroll_by_grade where grade = {class_id} and (academic_year = lastYear)"
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
                        name: "Total Cwsn Enrolled",
                        property: "cwsn_enrolled",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: '#fff',
                    },
                    {
                        name: "Cwsn Enrollment",
                        property: "cwsn_enrollment",
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
                "property": "cwsn_enrollment",
                "valueSuffix": "%"
            }
        }
    },
    total_students_enrolled: {
        "label": "Student Statistics",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year,sum(sum_total_students_enrolled) as students_enrolled from ingestion.scl_stats_total_enroll_by_state where state_id = {state_id} group by state_id",
                        "bigNumberComparison": "select sum_total_students_enrolled as students_enrolled from ingestion.scl_stats_total_enroll_by_state where state_id = {state_id} and (academic_year = lastYear)"
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
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year,sum(sum_total_students_enrolled) as students_enrolled from ingestion.scl_stats_total_enroll_by_district where district_id = {district_id} group by district_id",
                        "bigNumberComparison": "select sum_total_students_enrolled as students_enrolled from ingestion.scl_stats_total_enroll_by_district where district_id = {district_id} and (academic_year = lastYear)"
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
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year,sum(sum_total_students_enrolled) as students_enrolled from ingestion.scl_stats_total_enroll_by_block where block_id = {block_id} group by block_id",
                        "bigNumberComparison": "select sum_total_students_enrolled as students_enrolled from ingestion.scl_stats_total_enroll_by_block where block_id = {block_id} and (academic_year = lastYear)"

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
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year,sum(sum_total_students_enrolled) as students_enrolled from ingestion.scl_stats_total_enroll_by_cluster where cluster_id = {cluster_id} group by cluster_id",
                        "bigNumberComparison": "select sum_total_students_enrolled as students_enrolled from ingestion.scl_stats_total_enroll_by_cluster where cluster_id = {cluster_id} and (academic_year = lastYear)"
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
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year,sum(sum_total_students_enrolled) as students_enrolled from ingestion.scl_stats_total_enroll_by_school where school_id = {school_id} group_by school_id",
                        "bigNumberComparison": "select sum_total_students_enrolled as students_enrolled from ingestion.scl_stats_total_enroll_by_school where school_id = {school_id} and (academic_year = lastYear)"
                    },
                    "level": "grade"
                }
            },
            {
                "name": "Class",
                "labelProp": "grade",
                "valueProp": "grade",
                "hierarchyLevel": "6",
                "actions": {
                    "queries": {
                        "bigNumber": "select min(academic_year) as min_year,max(academic_year) as max_year,sum(sum_total_students_enrolled) as students_enrolled from ingestion.scl_stats_total_enroll_by_grade where grade = {class_id} group by grade",
                        "bigNumberComparison": "select sum_total_students_enrolled as students_enrolled from ingestion.scl_stats_total_enroll_by_grade where grade = {class_id} and (academic_year = lastYear)"
                    },
                    "level": "grade"
                }
            }
        ],
        "options": {
            "bigNumber": {
                "property": "students_enrolled",
                "valueSuffix": ""
            }
        }
    },
    category_wise_enrollment: {
        "label": "Student Statistics",
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "barChart": "select min(academic_year) as min_year,max(academic_year) as max_year,district_name as location,t.school_category, sum(sum_students_enrolled) as students_enrolled from (select distinct(district_id), state_id from ingestion.dimension_master) as m join ingestion.Scl_stats_grade_wise_enroll_by_district as t on m.district_id = t.district_id left join ingestion.dimension_district as d on t.district_id = d.district_id where m.state_id = {state_id} group by t.district_id, district_name, t.school_category",
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
                        "barChart": "select min(academic_year) as min_year,max(academic_year) as max_year,block_name as location,t.school_category, sum(sum_students_enrolled) as students_enrolled from (select distinct(block_id), district_id from ingestion.dimension_master) as m join ingestion.Scl_stats_grade_wise_enroll_by_block as t on m.block_id = t.block_id left join ingestion.dimension_block as d on t.block_id = d.block_id where m.district_id = {district_id} group by t.block_id, block_name, t.school_category",
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
                        "barChart": "select min(academic_year) as min_year,max(academic_year) as max_year,cluster_name as location,t.school_category, sum(sum_students_enrolled) as students_enrolled from (select distinct(cluster_id), block_id from ingestion.dimension_master) as m join ingestion.Scl_stats_grade_wise_enroll_by_cluster as t on m.cluster_id = t.cluster_id left join ingestion.dimension_cluster as d on t.cluster_id = d.cluster_id where m.block_id = {block_id} group by t.cluster_id, cluster_name, t.school_category",
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
                        "barChart": "select min(academic_year) as min_year,max(academic_year) as max_year,school_name as location,t.school_category, sum(sum_students_enrolled) as students_enrolled from (select distinct(school_id), cluster_id from ingestion.dimension_master) as m join ingestion.Scl_stats_grade_wise_enroll_by_school as t on t.school_id = m.school_id left join ingestion.dimension_school as d on t.school_id = d.school_id where m.cluster_id = {cluster_id} group by t.school_id, school_name, t.school_category",
                    },
                    "level": "school"
                }
            }
        ],
        "options": {
            "barChart": {
                "isMultibar": true,
                "metricLabelProp": "school_category",
                "metricValueProp": "students_enrolled",
                "yAxis": {
                    "title": "Students enrolled"
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
    gender_wise_student_enrollment: {
        "label": "Student Statistics",
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "barChart": "select min(academic_year) as min_year,max(academic_year) as max_year,district_name as location, t.gender, sum(sum_students_enrolled) as students_enrolled from ingestion.Scl_stats_gender_wise_enroll_by_district as t left join ingestion.dimension_district as d on t.district_id = d.district_id left join (select distinct(district_id), state_id from ingestion.dimension_master) as m on m.district_id = t.district_id where m.state_id = {state_id} group by t.district_id, district_name, t.gender",
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
                        "barChart": "select min(academic_year) as min_year,max(academic_year) as max_year,block_name as location, t.gender, sum(sum_students_enrolled) as students_enrolled from ingestion.Scl_stats_gender_wise_enroll_by_block as t left join ingestion.dimension_block as b on t.block_id = b.block_id left join (select distinct(block_id), district_id from ingestion.dimension_master) as m on m.block_id = t.block_id where m.district_id = {district_id} group by t.block_id, block_name, t.gender",
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
                        "barChart": "select min(academic_year) as min_year,max(academic_year) as max_year,cluster_name as location, t.gender, sum(sum_students_enrolled) as students_enrolled from ingestion.Scl_stats_gender_wise_enroll_by_cluster as t left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join (select distinct(cluster_id), block_id from ingestion.dimension_master) as m on m.cluster_id = t.cluster_id where m.block_id = {block_id} group by t.cluster_id, cluster_name, t.gender",
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
                        "barChart": "select min(academic_year) as min_year,max(academic_year) as max_year,school_name as location, t.gender, sum(sum_students_enrolled) as students_enrolled from ingestion.Scl_stats_gender_wise_enroll_by_school as t left join ingestion.dimension_school as s on t.school_id = s.school_id left join (select distinct(school_id), cluster_id from ingestion.dimension_master) as m on m.school_id = t.school_id where m.cluster_id = {cluster_id} group by t.school_id, school_name, t.gender",
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
                        "barChart": "select min(academic_year) as min_year,max(academic_year) as max_year,t.grade as location, t.gender, sum(sum_students_enrolled) as students_enrolled from ingestion.Scl_stats_gender_wise_enroll_by_grade as t left join ingestion.dimension_school as s on t.school_id = s.school_id where t.school_id = {school_id} group by t.grade,t.school_id, school_name, t.gender",
                    },
                    "level": "grade"
                }
            },
            {
                "name": "Grade",
                "labelProp": "grade",
                "valueProp": "grade",
                "hierarchyLevel": "6",
                "actions": {
                    "queries": {
                        "barChart": "select min(academic_year) as min_year,max(academic_year) as max_year,t.grade as location, t.gender, sum(sum_students_enrolled) as students_enrolled from ingestion.Scl_stats_gender_wise_enroll_by_grade as t where grade = {class_id} group by t.grade, t.gender",
                    },
                    "level": "grade"
                }
            }
        ],
        "options": {
            "barChart": {
                "isMultibar": true,
                "metricLabelProp": "gender",
                "metricValueProp": "students_enrolled",
                "yAxis": {
                    "title": "Students Enrolled"
                },
                "xAxis": {
                    "title": "Levels Id",
                    "label": "location",
                    "value": "location",
                    "metrics": [
                        {
                            "label": "Male",
                            "value": "male"
                        },
                        {
                            "label": "Female",
                            "value": "female"
                        },
                        {
                            "label": "Other",
                            "value": "other"
                        }
                    ]
                }
            }
        }
    },
    student_category_wise_enrollment: {
        "label": "Student Statistics",
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "barChart": "select min(academic_year) as min_year,max(academic_year) as max_year,district_name as location, t.student_category, sum(sum_students_enrolled) as students_enrolled from ingestion.Scl_stats_std_cat_wise_enroll_by_district as t left join ingestion.dimension_district as d on t.district_id = d.district_id left join (select distinct(district_id), state_id from ingestion.dimension_master) as m on m.district_id = t.district_id where m.state_id = {state_id} group by t.district_id, district_name, t.student_category",
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
                        "barChart": "select min(academic_year) as min_year,max(academic_year) as max_year,block_name as location, t.student_category, sum(sum_students_enrolled) as students_enrolled from ingestion.Scl_stats_std_cat_wise_enroll_by_block as t left join ingestion.dimension_block as d on t.block_id = d.block_id left join (select distinct(block_id), district_id from ingestion.dimension_master) as m on m.block_id = t.block_id where m.district_id = {district_id} group by t.block_id, block_name, t.student_category",
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
                        "barChart": "select min(academic_year) as min_year,max(academic_year) as max_year,cluster_name as location, t.student_category, sum(sum_students_enrolled) as students_enrolled from ingestion.Scl_stats_std_cat_wise_enroll_by_cluster as t left join ingestion.dimension_cluster as d on t.cluster_id = d.cluster_id left join (select distinct(cluster_id), block_id from ingestion.dimension_master) as m on m.cluster_id = t.cluster_id where m.block_id = {block_id} group by t.cluster_id, cluster_name, t.student_category",
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
                        "barChart": "select min(academic_year) as min_year,max(academic_year) as max_year,school_name as location, t.student_category, sum(sum_students_enrolled) as students_enrolled from ingestion.Scl_stats_std_cat_wise_enroll_by_school as t left join ingestion.dimension_school as d on t.school_id = d.school_id left join (select distinct(school_id), cluster_id from ingestion.dimension_master) as m on m.school_id = t.school_id where m.cluster_id = {cluster_id} group by t.school_id, school_name, t.student_category",
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
                        "barChart": "select min(academic_year) as min_year,max(academic_year) as max_year,t.grade as location, t.student_category, sum(sum_students_enrolled) as students_enrolled from ingestion.Scl_stats_std_cat_wise_enroll_by_grade as t left join ingestion.dimension_school as d on t.school_id = d.school_id where t.school_id = {school_id} group by t.grade, t.school_id, school_name, t.student_category",
                    },
                    "level": "grade"
                }
            },
            {
                "name": "Grade",
                "labelProp": "grade",
                "valueProp": "grade",
                "hierarchyLevel": "6",
                "actions": {
                    "queries": {
                        "barChart": "select min(academic_year) as min_year,max(academic_year) as max_year,t.grade as location, t.student_category, sum(sum_students_enrolled) as students_enrolled from ingestion.Scl_stats_std_cat_wise_enroll_by_grade as t where grade = {class_id} group by t.grade, t.student_category",
                    },
                    "level": "grade"
                }
            }
        ],
        "options": {
            "barChart": {
                "isMultibar": true,
                "metricLabelProp": "student_category",
                "metricValueProp": "students_enrolled",
                "yAxis": {
                    "title": "Students Eenrolled"
                },
                "xAxis": {
                    "title": "Levels Id",
                    "label": "location",
                    "value": "location",
                    "metrics": [
                        {
                            "label": "SC",
                            "value": "sc"
                        },
                        {
                            "label": "ST",
                            "value": "st"
                        },
                        {
                            "label": "OBC",
                            "value": "obc"
                        },
                        {
                            "label": "General",
                            "value": "general"
                        },
                        {
                            "label": "Other",
                            "value": "other"
                        }
                    ]
                }
            }
        }
    },
    rank_students_enrolled_and_cwsn_enrollment: {
        "label": "Student Statistics",
        "defaultLevel": "district",
        "filters": [
            {
                "name": "District",
                "labelProp": "district_name",
                "valueProp": "district_id",
                "hierarchyLevel": "2",
                "actions": {
                    "queries": {
                        "table": "select round(percentage,0) as percentage,min(academic_year) as min_year,max(academic_year) as max_year,district_name, dense_rank() over(order by sum(sum_cwsn_enrolled) desc) as cwsn_enrolled_rank, dense_rank() over(order by sum(sum_total_students_enrolled) desc) as students_enrolled_rank from ingestion.scl_stats_cwsn_enroll_by_district as t left join ingestion.dimension_district as d on t.district_id = d.district_id left join (select distinct(district_id), state_id from ingestion.dimension_master) as m on m.district_id = t.district_id where state_id = {state_id} group by t.district_id, district_name,t.percentage",
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
                        "table": "select round(percentage,0) as percentage,min(academic_year) as min_year,max(academic_year) as max_year,block_name, dense_rank() over(order by sum(sum_cwsn_enrolled) desc) as cwsn_enrolled_rank, dense_rank() over(order by sum(sum_total_students_enrolled) desc) as students_enrolled_rank from ingestion.scl_stats_cwsn_enroll_by_block as t left join ingestion.dimension_block as b on t.block_id = b.block_id left join (select distinct(block_id), district_id from ingestion.dimension_master) as m on m.block_id = t.block_id where district_id = {district_id} group by t.block_id, block_name,t.percentage",
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
                        "table": "select round(percentage,0) as percentage,min(academic_year) as min_year,max(academic_year) as max_year,cluster_name, dense_rank() over(order by sum(sum_cwsn_enrolled) desc) as cwsn_enrolled_rank, dense_rank() over(order by sum(sum_total_students_enrolled) desc) as students_enrolled_rank from ingestion.scl_stats_cwsn_enroll_by_cluster as t left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join (select distinct(cluster_id), block_id from ingestion.dimension_master) as m on m.cluster_id = t.cluster_id where block_id = {block_id} group by t.cluster_id, cluster_name,t.percentage",
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
                        "table": "select round(percentage,0) as percentage,min(academic_year) as min_year,max(academic_year) as max_year,school_name, dense_rank() over(order by sum(sum_cwsn_enrolled) desc) as cwsn_enrolled_rank, dense_rank() over(order by sum(sum_total_students_enrolled) desc) as students_enrolled_rank from ingestion.scl_stats_cwsn_enroll_by_school as t left join ingestion.dimension_school as s on t.school_id = s.school_id left join (select distinct(school_id), cluster_id from ingestion.dimension_master) as m on m.school_id = t.school_id where cluster_id = {cluster_id} group by t.school_id, school_name,t.percentage",
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
                        "table": "select round(percentage,0) as percentage,min(academic_year) as min_year,max(academic_year) as max_year,grade, dense_rank() over(order by sum(sum_cwsn_enrolled) desc) as cwsn_enrolled_rank, dense_rank() over(order by sum(sum_total_students_enrolled) desc) as students_enrolled_rank from ingestion.scl_stats_cwsn_enroll_by_grade as t where t.school_id = {school_id} group by grade, t.school_id,t.percentage",
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
                        name: "Rank for Student Enrolled",
                        property: "students_enrolled_rank",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: '#fff'
                    },
                    {
                        name: "Rank for CWSN Enrollment",
                        property: "cwsn_enrolled_rank",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: '#fff'
                    },
                    {
                        name: "Percentage",
                        property: "percentage",
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
            }
        }
    }
}