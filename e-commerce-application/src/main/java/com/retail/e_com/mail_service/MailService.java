package com.retail.e_com.mail_service;

import java.util.Date;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import com.retail.e_com.util.MessageModel;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class MailService {
	private JavaMailSender javaMailSender;
	
	public void sendMailMessage(MessageModel messageModel) throws MessagingException {
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);
		helper.setTo(messageModel.getTo());
		helper.setSubject(messageModel.getSubject());
		helper.setSentDate(new Date());
		helper.setText(messageModel.getText(), true);
		javaMailSender.send(message);
	}

}
