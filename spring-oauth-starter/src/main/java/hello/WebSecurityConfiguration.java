package hello;

import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

// Use OAuth for authentication.
@EnableOAuth2Sso
@Configuration
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        http
//        .csrf()
//        .disable()
//        .antMatcher("/**")
//        .authorizeRequests()
//        .antMatchers("/", "/index.html")
//        .permitAll()
//        .anyRequest()
//        .authenticated();    	
//		
		// Only index.html is viewable by everyone - this will be the landing page.		
				
        http.csrf().disable()
			.antMatcher("/**")
            .authorizeRequests()
            .antMatchers("/", "/index.html").permitAll()
            .anyRequest().authenticated();
    }
}