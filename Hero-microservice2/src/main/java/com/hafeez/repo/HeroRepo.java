package com.hafeez.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hafeez.model.Hero;

@Repository
public interface HeroRepo extends JpaRepository<Hero, Integer>{

}
