package com.kloudinfinty.repositories;


import com.kloudinfinty.model.ERole;
import com.kloudinfinty.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
  Optional<Role> findByName(ERole name);
}
