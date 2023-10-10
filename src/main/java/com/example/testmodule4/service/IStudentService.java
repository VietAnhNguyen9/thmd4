package com.example.testmodule4.service;

import com.example.testmodule4.model.Student;

import java.util.List;

public interface IStudentService extends IGenerateService<Student>{
    List<Student> search(String name);
}
