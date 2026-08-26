package com.pratiksha.resume_service.repository;

import com.pratiksha.resume_service.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeRepository extends JpaRepository<Resume,Long>{

 List<Resume> findAllByOrderByScoreDesc();

}