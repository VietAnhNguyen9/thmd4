package com.example.testmodule4.repository;

import com.example.testmodule4.model.Classes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IClassRepository extends JpaRepository<Classes,Long> {
}
