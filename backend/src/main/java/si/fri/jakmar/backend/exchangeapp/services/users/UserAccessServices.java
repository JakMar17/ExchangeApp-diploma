package si.fri.jakmar.backend.exchangeapp.services.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import si.fri.jakmar.backend.exchangeapp.database.entities.courses.CourseEntity;
import si.fri.jakmar.backend.exchangeapp.database.entities.users.UserEntity;
import si.fri.jakmar.backend.exchangeapp.database.repositories.CourseRepository;
import si.fri.jakmar.backend.exchangeapp.database.repositories.UserRepository;
import si.fri.jakmar.backend.exchangeapp.services.exceptions.AccessForbiddenException;
import si.fri.jakmar.backend.exchangeapp.services.exceptions.AccessUnauthorizedException;

import java.util.List;

@Component
public class UserAccessServices {

    @Autowired
    private UserRepository userRepository;
    @Autowired private CourseRepository courseRepository;

    public boolean userHasAccessToCourse(UserEntity userEntity, CourseEntity courseEntity) throws AccessForbiddenException, AccessUnauthorizedException {
        boolean hasAccess = false;

        if(userIsAdmin((userEntity)))
            hasAccess = true;

        if(userIsGuardian(userEntity, courseEntity))
            hasAccess = true;

        //check if on blacklist
        if(!hasAccess && userOnList(userEntity, courseEntity.getUsersBlacklisted()))
            throw new AccessForbiddenException("Uporabniku je blokiran dostop do predmeta");

        if(!hasAccess)
            switch (courseEntity.getAccessLevel().getDescription()) {
                case "WHITELIST":
                    if(userOnList(userEntity, courseEntity.getUsersWhitelisted()))
                        hasAccess = true;
                    else
                        throw new AccessForbiddenException("Uporabnik ni dodan med izjeme, ki imajo dostop do predmeta");
                case "PASSWORD":
                    if(userOnList(userEntity, courseEntity.getUsersSignedInCourse()))
                        hasAccess = true;
                    else
                        throw new AccessUnauthorizedException("Predmet je zaščiten z geslom, vnesite ga preden lahko nadaljujete");
                default:
                    hasAccess = true;
            }


        signUserInCourse(userEntity, courseEntity);
        return true;
    }

    private boolean userIsAdmin(UserEntity userEntity) {
        return userEntity.getUserType().getId() == 1;
    }

    private boolean userIsGuardian(UserEntity userEntity, CourseEntity courseEntity) {
        if(userEntity.equals(courseEntity.getGuardianMain()))
            return true;

        return courseEntity.getUsersGuardians().stream().anyMatch(userEntity::equals);
    }

    private boolean userOnList(UserEntity user, List<UserEntity> list) {
        return list.stream().anyMatch(user::equals);
    }

    public void signUserInCourse(UserEntity user, CourseEntity course) {
        var userCourses = user.getUsersCourses();
        boolean isSignedIn = userCourses.stream().anyMatch(course::equals);
        if(!isSignedIn) {
            userCourses.add(course);
            user.setUsersCourses(userCourses);

            var users = course.getUsersSignedInCourse();
            users.add(user);
            course.setUsersSignedInCourse(users);
        }

        courseRepository.save(course);
    }

    public boolean userCanEditCourse(UserEntity user, CourseEntity course) {
        return userIsAdmin(user) || userOnList(user, course.getUsersGuardians());
    }

}
