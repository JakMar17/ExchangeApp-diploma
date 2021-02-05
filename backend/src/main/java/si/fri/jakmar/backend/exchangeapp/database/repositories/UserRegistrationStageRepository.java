package si.fri.jakmar.backend.exchangeapp.database.repositories;

import org.springframework.data.repository.CrudRepository;
import si.fri.jakmar.backend.exchangeapp.database.entities.users.UserRegistrationStage;

public interface UserRegistrationStageRepository extends CrudRepository<UserRegistrationStage, Integer> {
}
