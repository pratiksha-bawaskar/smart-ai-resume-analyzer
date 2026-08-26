package com.pratiksha.ranking_service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pratiksha.ranking_service.entity.Ranking;

public interface RankingRepository extends JpaRepository<Ranking, Long> {

    @Query(value = "SELECT resume_id, remarks, score FROM ranking ORDER BY score DESC", nativeQuery = true)
    List<Object[]> getRanking();

}