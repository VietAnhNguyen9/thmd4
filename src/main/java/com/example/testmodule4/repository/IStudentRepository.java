package com.example.testmodule4.repository;

import com.example.testmodule4.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IStudentRepository extends JpaRepository<Student, Long> {
    @Query(value = "select * from student where student.name like %?%",nativeQuery = true)
    List<Student> search(String name);
}
