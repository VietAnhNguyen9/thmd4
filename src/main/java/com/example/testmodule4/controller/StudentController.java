package com.example.testmodule4.controller;

import com.example.testmodule4.model.Classes;
import com.example.testmodule4.model.Student;
import com.example.testmodule4.repository.IClassRepository;
import com.example.testmodule4.service.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/students")
public class StudentController {
    @Autowired
    private IStudentService studentService;

    @Autowired
    private IClassRepository classRepository;

    @GetMapping("/classes")
    public ResponseEntity<Iterable<Classes>> displayAllC() {
        return new ResponseEntity<>(classRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Iterable<Student>> displayAll() {
        return new ResponseEntity<>(studentService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> findOne(@PathVariable Long id) {
        Student student = studentService.findOne(id);
        if (student != null) {
            return new ResponseEntity<>(student, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping
    public ResponseEntity<?> save(@RequestBody Student student) {
        studentService.save(student);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Student> delete(@PathVariable long id) {
        Student student = studentService.findOne(id);
        if (student != null) {
            studentService.delete(id);
            return new ResponseEntity<>(student, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<List<Student>> searchName (@PathVariable ("name") String name){
        return  new ResponseEntity<>(studentService.search(name),HttpStatus.OK);

    }
}
