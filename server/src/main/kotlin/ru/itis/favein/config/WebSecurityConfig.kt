package ru.itis.favein.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.password.NoOpPasswordEncoder
import org.springframework.security.provisioning.InMemoryUserDetailsManager
import javax.sql.DataSource

//import ru.itis.favein.models.User
//import ru.itis.favein.services.UserService


@Configuration
@EnableWebSecurity
class WebSecurityConfig(
    @Autowired
    private val dataSource: DataSource  // generated by Spring
) : WebSecurityConfigurerAdapter() {
//    @Autowired
//    private val userService: UserService? = null

    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http
                .authorizeRequests()
                    .antMatchers(
                            "/", "/signup", "/static/app/*"
//                            "/welcome", "/index", ,
//                            "/static/**/*", "/img/**", "/js/**", "/css/**"
                    ).permitAll()
                    .anyRequest().authenticated()
                .and()
                    .formLogin()
                    .loginPage("/login")
                    .permitAll()
                .and()
                    .logout()
                    .permitAll()
    }

//    @Throws(Exception::class)
//    override fun configure(auth: AuthenticationManagerBuilder) { /*String sql_users = "select username, password from usr " +
//                "where username=?";
//        String sql_roles = "select u.username, ur.roles from usr u " +
//                "inner join user_role ur " +
//                "on u.id = ur.user_id " +
//                "where u.username=?";*/
//        auth.userDetailsService<UserDetailsService?>(userService)
//                .passwordEncoder(NoOpPasswordEncoder.getInstance())
//    } //    HARDCODE AUTH

    @Throws(Exception::class)
    override fun configure(auth: AuthenticationManagerBuilder) {
        auth.jdbcAuthentication()
                .dataSource(dataSource)
                .passwordEncoder(NoOpPasswordEncoder.getInstance())
                .usersByUsernameQuery(
                        "select username, password, active from usr where username=?"
                )
                .authoritiesByUsernameQuery(
                        "select u.username, ur.roles from usr u inner join user_role ur on u.id = ur.user_id where u.username=?"
                )
    }

    @Bean
    override fun userDetailsService(): UserDetailsService? {
        val user: UserDetails =
                User.withDefaultPasswordEncoder()
                        .username("admin")
                        .password("admin")
                        .roles("USER")
                        .build()
        return InMemoryUserDetailsManager(user)
    }
}